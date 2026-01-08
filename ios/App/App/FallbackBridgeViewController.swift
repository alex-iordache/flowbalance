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

    override func viewDidLoad() {
        super.viewDidLoad()

        // Ensure we get navigation failures so we can fall back.
        self.webView?.navigationDelegate = self

        // If we're offline at launch, switch immediately to local.
        if !Self.isOnline() {
            loadLocalFallback()
        }
    }

    private func loadLocalFallback() {
        if didAttemptLocalFallback { return }
        didAttemptLocalFallback = true

        // Load the bundled web app from Capacitor's local scheme handler.
        if let url = URL(string: "capacitor://localhost/offline.html") {
            let req = URLRequest(url: url, cachePolicy: .reloadIgnoringLocalCacheData, timeoutInterval: 5)
            self.webView?.stopLoading()
            self.webView?.load(req)
        }
    }

    // MARK: - WKNavigationDelegate

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        loadLocalFallback()
    }

    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
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

