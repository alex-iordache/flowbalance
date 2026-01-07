import Foundation
import Capacitor
import WebKit

/**
 NativeViewport logger

 Purpose: diagnose the iOS-only "first sign-in => wrong scale/no-scroll until relaunch" issue.
 This logs WKWebView + scroll view metrics from native code so we still get signal even when
 WebKit blocks user-script / messageHandler injection (which can prevent JS console logs
 from showing in Xcode).

 NOTE: Logs are compiled in DEBUG only.
 */
class DebugBridgeViewController: CAPBridgeViewController, WKNavigationDelegate {
    #if DEBUG
    private var tickTimer: Timer?
    private var tickCount: Int = 0
    #endif

    private func normalizeZoomIfNeeded(reason: String) {
        guard let sv = self.webView?.scrollView else { return }
        // If iOS auto-zoomed due to focused input (font-size < 16px), it can get stuck.
        // Force it back to 1.0 to restore correct layout + scrolling.
        let z = sv.zoomScale
        if z > 1.02 || z < 0.98 {
            sv.setZoomScale(1.0, animated: false)
            #if DEBUG
            print("[NativeViewport] normalizeZoomIfNeeded(\(reason)) from zoomScale=\(z) -> 1.0")
            #endif
        }
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        #if DEBUG
        // Attach navigation delegate early for URL + load lifecycle signal.
        self.webView?.navigationDelegate = self

        NotificationCenter.default.addObserver(
            self,
            selector: #selector(onKeyboardWillShow(_:)),
            name: UIResponder.keyboardWillShowNotification,
            object: nil
        )
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(onKeyboardWillHide(_:)),
            name: UIResponder.keyboardWillHideNotification,
            object: nil
        )
        logViewport(reason: "viewDidLoad")
        #endif
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        normalizeZoomIfNeeded(reason: "viewDidAppear")

        #if DEBUG
        logViewport(reason: "viewDidAppear")

        // Sample for a short window to catch transient bad viewport states after auth/keyboard.
        tickTimer?.invalidate()
        tickCount = 0
        tickTimer = Timer.scheduledTimer(withTimeInterval: 0.75, repeats: true) { [weak self] _ in
            guard let self = self else { return }
            self.tickCount += 1
            self.logViewport(reason: "timer:\(self.tickCount)")
            if self.tickCount >= 20 {
                self.tickTimer?.invalidate()
                self.tickTimer = nil
            }
        }
        #endif
    }

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        normalizeZoomIfNeeded(reason: "viewDidLayoutSubviews")
        #if DEBUG
        logViewport(reason: "viewDidLayoutSubviews")
        #endif
    }

    deinit {
        #if DEBUG
        NotificationCenter.default.removeObserver(self)
        tickTimer?.invalidate()
        #endif
    }

    // MARK: - WKNavigationDelegate

    func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {
        #if DEBUG
        logViewport(reason: "didStartProvisionalNavigation")
        #endif
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        normalizeZoomIfNeeded(reason: "didFinishNavigation")
        #if DEBUG
        logViewport(reason: "didFinishNavigation")
        #endif
    }

    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        #if DEBUG
        print("[NativeViewport] didFailNavigation error=\(error.localizedDescription)")
        logViewport(reason: "didFailNavigation")
        #endif
    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        #if DEBUG
        print("[NativeViewport] didFailProvisionalNavigation error=\(error.localizedDescription)")
        logViewport(reason: "didFailProvisionalNavigation")
        #endif
    }

    // MARK: - Keyboard notifications

    #if DEBUG
    @objc private func onKeyboardWillShow(_ note: Notification) {
        logViewport(reason: "keyboardWillShow")
    }

    @objc private func onKeyboardWillHide(_ note: Notification) {
        normalizeZoomIfNeeded(reason: "keyboardWillHide")
        logViewport(reason: "keyboardWillHide")
    }
    #endif

    // MARK: - Logging

    #if DEBUG
    private func logViewport(reason: String) {
        let v = self.view
        let wb = self.webView
        let sv = wb?.scrollView

        let urlString = wb?.url?.absoluteString ?? "(nil)"
        let host = wb?.url?.host ?? "(nil)"

        var limitsAppBound: String = "(n/a)"
        if #available(iOS 14.0, *) {
            limitsAppBound = String(wb?.configuration.limitsNavigationsToAppBoundDomains ?? false)
        }

        let viewBounds = v?.bounds ?? .zero
        let safe = v?.safeAreaInsets ?? .zero

        let contentSize = sv?.contentSize ?? .zero
        let contentInset = sv?.contentInset ?? .zero
        let adjustedInset = sv?.adjustedContentInset ?? .zero

        let zoom = sv?.zoomScale ?? 1.0
        let isScrollEnabled = sv?.isScrollEnabled ?? false
        let alwaysBounceV = sv?.alwaysBounceVertical ?? false
        let bounces = sv?.bounces ?? false

        print("[NativeViewport] \(reason)")
        print("[NativeViewport] url=\(urlString)")
        print("[NativeViewport] host=\(host) limitsNavigationsToAppBoundDomains=\(limitsAppBound)")
        print("[NativeViewport] view.bounds=\(viewBounds) safeArea=\(safe)")
        print("[NativeViewport] scrollEnabled=\(isScrollEnabled) zoomScale=\(zoom) bounces=\(bounces) alwaysBounceVertical=\(alwaysBounceV)")
        print("[NativeViewport] contentSize=\(contentSize) contentInset=\(contentInset) adjustedInset=\(adjustedInset)")
    }
    #endif
}


