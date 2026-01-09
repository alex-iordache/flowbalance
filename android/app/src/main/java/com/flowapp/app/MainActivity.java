package com.flowapp.app;

import android.os.Build;
import android.os.Bundle;
import android.webkit.CookieManager;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceError;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebViewClient;

public class MainActivity extends BridgeActivity {
  // Load directly from bundled assets when remote load fails.
  // This works even when `server.url` is set (remote-first mode).
  private static final String LOCAL_OFFLINE_URL = "file:///android_asset/offline.html";

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Install an error fallback that loads the bundled offline page when the remote load fails.
    // This catches cold-start offline cases before any JS can run.
    try {
      final WebView webView = this.getBridge().getWebView();
      webView.setWebViewClient(new BridgeWebViewClient(this.getBridge()) {
        private boolean isAlreadyOnOfflinePage(WebView view) {
          try {
            String current = view.getUrl();
            return current != null && current.startsWith(LOCAL_OFFLINE_URL);
          } catch (Exception ignored) {
            return false;
          }
        }

        @Override
        public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
          // Don't call super: we want to load from bundled assets, not Capacitor's errorPath (which requires server.url).
          if (request != null && request.isForMainFrame() && !isAlreadyOnOfflinePage(view)) {
            view.loadUrl(LOCAL_OFFLINE_URL);
          }
        }

        @Override
        public void onReceivedHttpError(WebView view, WebResourceRequest request, WebResourceResponse errorResponse) {
          if (request != null && request.isForMainFrame() && !isAlreadyOnOfflinePage(view)) {
            view.loadUrl(LOCAL_OFFLINE_URL);
          }
        }
      });
    } catch (Exception ignored) {
      // If WebView setup fails, fall back to default behavior.
    }

    // Clerk dev instances use a different domain (e.g. *.clerk.accounts.dev).
    // If third-party cookies are blocked in the WebView, Clerk may fall back to opening
    // the system browser during sign-in. Enable third-party cookies so auth stays in-app.
    try {
      CookieManager cm = CookieManager.getInstance();
      cm.setAcceptCookie(true);
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
        WebView webView = this.getBridge().getWebView();
        cm.setAcceptThirdPartyCookies(webView, true);
      }
    } catch (Exception ignored) {
      // ignore
    }

    // Enable remote debugging (chrome://inspect) for Android WebView in debug builds.
    if (BuildConfig.DEBUG) {
      WebView.setWebContentsDebuggingEnabled(true);
    }
  }
}
