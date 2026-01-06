package com.flowapp.app;

import android.os.Build;
import android.os.Bundle;
import android.webkit.CookieManager;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

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
