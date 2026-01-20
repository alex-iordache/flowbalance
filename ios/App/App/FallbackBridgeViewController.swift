import Capacitor
import Foundation
import SystemConfiguration
import WebKit

/// Remote-first with local fallback:
/// - Normally we load `server.url` (https://www.flowbalance.app).
/// - If the device is offline at launch OR the remote load fails, we load the bundled web assets instead.
///
/// This prevents the ugly iOS "Webpage not available" white error page and allows our JS offline overlay to run.
final class FallbackBridgeViewController: CAPBridgeViewController, WKNavigationDelegate {
    private var didAttemptLocalFallback = false
    private var watchdogArmed = false

    private func fbLog(_ msg: String) {
        NSLog("[FlowOffline][iOS] \(msg)")
    }
    
    private func isIgnorableNavigationError(_ error: Error) -> Bool {
        let ns = error as NSError
        // -999 is "NSURLErrorCancelled" and happens during normal redirects/navigation replacements.
        // Treating it as a fatal load failure causes false-positive offline fallbacks and loops.
        if ns.domain == NSURLErrorDomain && ns.code == NSURLErrorCancelled {
            return true
        }
        return false
    }
    
    private func bundledFileExists(_ name: String) -> Bool {
        guard let cfg = bridge?.config else { return false }
        let path = cfg.appLocation.appendingPathComponent(name).path
        return FileManager.default.fileExists(atPath: path)
    }

    override func instanceDescriptor() -> InstanceDescriptor {
        // This is called very early (during CAPBridgeViewController.loadView), before the initial URL is loaded.
        // For a true cold-start offline, relying on navigation delegate error callbacks is flaky.
        // Instead, force Capacitor to start from the bundled local server when offline.
        let descriptor = super.instanceDescriptor()

        if !Self.isOnline() {
            fbLog("instanceDescriptor: offline -> force local start (serverURL=nil, appStartPath=index.html)")
            descriptor.serverURL = nil
            descriptor.appStartPath = "index.html"
            // Keep errorPath if present; it will resolve against localURL when serverURL is nil.
        } else {
            fbLog("instanceDescriptor: online -> keep remote-first server.url")
        }

        return descriptor
    }

    override func capacitorDidLoad() {
        super.capacitorDidLoad()
        fbLog("FallbackBridgeViewController capacitorDidLoad")

        if let cfg = bridge?.config {
            fbLog("config.serverURL=\(cfg.serverURL.absoluteString)")
            fbLog("config.localURL=\(cfg.localURL.absoluteString)")
            fbLog("config.appStartServerURL=\(cfg.appStartServerURL.absoluteString)")
            fbLog("config.appLocation=\(cfg.appLocation.path)")
            fbLog("config.errorPath=\(cfg.errorPath ?? "nil")")

            let offlinePath = cfg.appLocation.appendingPathComponent("offline.html").path
            let indexPath = cfg.appLocation.appendingPathComponent("index.html").path
            fbLog("exists offline.html=\(FileManager.default.fileExists(atPath: offlinePath)) (\(offlinePath))")
            fbLog("exists index.html=\(FileManager.default.fileExists(atPath: indexPath)) (\(indexPath))")
        } else {
            fbLog("bridge/config not available in capacitorDidLoad")
        }
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        fbLog("FallbackBridgeViewController viewDidLoad")
        fbLog("webView initial url=\(self.webView?.url?.absoluteString ?? "nil") isLoading=\(self.webView?.isLoading ?? false)")

        // Watchdog: if we still end up blank/black (no url) shortly after launch, force local fallback.
        // This catches cases where WebKit fails before delegations fire.
        if !watchdogArmed {
            watchdogArmed = true
            DispatchQueue.main.asyncAfter(deadline: .now() + 1.25) { [weak self] in
                guard let self = self else { return }
                let current = self.webView?.url?.absoluteString ?? ""
                let isBlank = current.isEmpty || current == "about:blank"
                self.fbLog("watchdog(1.25s) url='\(current)' blank=\(isBlank)")
                if isBlank {
                    self.fbLog("watchdog -> loadLocalFallback()")
                    self.loadLocalFallback()
                }
            }
        }
    }

    private func loadLocalFallback() {
        if didAttemptLocalFallback { return }
        didAttemptLocalFallback = true
        fbLog("loadLocalFallback() start")

        // Prefer offline.html (nice UI), but never loop if it's missing.
        let hasOffline = bundledFileExists("offline.html")
        let target = hasOffline ? "offline.html" : "index.html"
        
        // Load the bundled page from Capacitor's local scheme handler.
        if let url = URL(string: "capacitor://localhost/\(target)") {
            fbLog("loading capacitor://localhost/\(target) (hasOffline=\(hasOffline))")
            let req = URLRequest(url: url, cachePolicy: .reloadIgnoringLocalCacheData, timeoutInterval: 5)
            self.webView?.stopLoading()
            self.webView?.load(req)
        }

        // Safety net: if offline.html fails for any reason, fall back to index.html so we never stay black.
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) { [weak self] in
            guard let self = self else { return }
            guard let wv = self.webView else { return }
            let current = wv.url?.absoluteString ?? ""
            self.fbLog("fallback-check(1.0s) url='\(current)'")
            if current.isEmpty || current == "about:blank" {
                if let u = URL(string: "capacitor://localhost/index.html") {
                    self.fbLog("fallback -> loading capacitor://localhost/index.html")
                    let req = URLRequest(url: u, cachePolicy: .reloadIgnoringLocalCacheData, timeoutInterval: 5)
                    wv.stopLoading()
                    wv.load(req)
                }
            }
        }
    }

    // MARK: - WKNavigationDelegate

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        if isIgnorableNavigationError(error) { return }
        loadLocalFallback()
    }

    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        if isIgnorableNavigationError(error) { return }
        loadLocalFallback()
    }

    // MARK: - Reachability (best-effort)

    private static func isOnline() -> Bool {
        var zeroAddress = sockaddr_in()
        zeroAddress.sin_len = UInt8(MemoryLayout<sockaddr_in>.size)
        zeroAddress.sin_family = sa_family_t(AF_INET)

        let reachability = withUnsafePointer(to: &zeroAddress) {
            $0.withMemoryRebound(to: sockaddr.self, capacity: 1) { zeroSockAddress in
                SCNetworkReachabilityCreateWithAddress(nil, zeroSockAddress)
            }
        }

        var flags = SCNetworkReachabilityFlags()
        guard let ref = reachability, SCNetworkReachabilityGetFlags(ref, &flags) else {
            return true // if unsure, don't force local
        }

        let reachable = flags.contains(.reachable)
        let needsConnection = flags.contains(.connectionRequired)
        return reachable && !needsConnection
    }
}

