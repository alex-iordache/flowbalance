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

        // Newer iOS versions can also apply page zoom without affecting scrollView.zoomScale.
        if #available(iOS 14.0, *) {
            if let wb = self.webView {
                let pz = wb.pageZoom
                if pz > 1.02 || pz < 0.98 {
                    wb.pageZoom = 1.0
                    #if DEBUG
                    print("[NativeViewport] normalizeZoomIfNeeded(\(reason)) from pageZoom=\(pz) -> 1.0")
                    #endif
                }
            }
        }
    }

    private func normalizeOffsetIfNeeded(reason: String) {
        guard let sv = self.webView?.scrollView else { return }
        // After keyboard transitions / auth navigations, WKWebView can keep a stale contentOffset
        // which makes the page appear shifted (not aligned to top-left).
        let off = sv.contentOffset
        if abs(off.x) > 0.5 || abs(off.y) > 0.5 {
            sv.setContentOffset(.zero, animated: false)
            #if DEBUG
            print("[NativeViewport] normalizeOffsetIfNeeded(\(reason)) from contentOffset=\(off) -> .zero")
            #endif
        }
    }

    private func normalizeScrollInsets(reason: String) {
        guard let sv = self.webView?.scrollView else { return }
        // When the keyboard opens/closes, WKWebView can end up with stale insets/adjustments
        // which makes the page appear shifted or "bigger than screen".
        if #available(iOS 11.0, *) {
            if sv.contentInsetAdjustmentBehavior != .never {
                sv.contentInsetAdjustmentBehavior = .never
                #if DEBUG
                print("[NativeViewport] normalizeScrollInsets(\(reason)) set contentInsetAdjustmentBehavior=.never")
                #endif
            }
        }
        if sv.contentInset != .zero || sv.scrollIndicatorInsets != .zero {
            sv.contentInset = .zero
            sv.scrollIndicatorInsets = .zero
            #if DEBUG
            print("[NativeViewport] normalizeScrollInsets(\(reason)) reset contentInset/scrollIndicatorInsets to .zero")
            #endif
        }
        if sv.isScrollEnabled == false {
            sv.isScrollEnabled = true
            #if DEBUG
            print("[NativeViewport] normalizeScrollInsets(\(reason)) set isScrollEnabled=true")
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
        normalizeOffsetIfNeeded(reason: "viewDidAppear")
        normalizeScrollInsets(reason: "viewDidAppear")

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
        normalizeOffsetIfNeeded(reason: "viewDidLayoutSubviews")
        normalizeScrollInsets(reason: "viewDidLayoutSubviews")
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
        normalizeOffsetIfNeeded(reason: "didFinishNavigation")
        normalizeScrollInsets(reason: "didFinishNavigation")
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
        normalizeOffsetIfNeeded(reason: "keyboardWillHide")
        normalizeScrollInsets(reason: "keyboardWillHide")
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
        let contentOffset = sv?.contentOffset ?? .zero
        let scrollFrame = sv?.frame ?? .zero
        let scrollBounds = sv?.bounds ?? .zero
        let insetBehavior: String = {
            if #available(iOS 11.0, *) {
                return String(describing: sv?.contentInsetAdjustmentBehavior.rawValue ?? -1)
            }
            return "(n/a)"
        }()

        let zoom = sv?.zoomScale ?? 1.0
        var pageZoom: CGFloat? = nil
        if #available(iOS 14.0, *) {
            pageZoom = wb?.pageZoom
        }
        let isScrollEnabled = sv?.isScrollEnabled ?? false
        let alwaysBounceV = sv?.alwaysBounceVertical ?? false
        let bounces = sv?.bounces ?? false

        print("[NativeViewport] \(reason)")
        print("[NativeViewport] url=\(urlString)")
        print("[NativeViewport] host=\(host) limitsNavigationsToAppBoundDomains=\(limitsAppBound)")
        print("[NativeViewport] view.bounds=\(viewBounds) safeArea=\(safe)")
        print("[NativeViewport] scrollEnabled=\(isScrollEnabled) zoomScale=\(zoom) pageZoom=\(pageZoom.map { String(describing: $0) } ?? "(n/a)") bounces=\(bounces) alwaysBounceVertical=\(alwaysBounceV)")
        print("[NativeViewport] scroll.frame=\(scrollFrame) scroll.bounds=\(scrollBounds) contentOffset=\(contentOffset) insetBehavior=\(insetBehavior)")
        print("[NativeViewport] contentSize=\(contentSize) contentInset=\(contentInset) adjustedInset=\(adjustedInset)")
    }
    #endif
}


