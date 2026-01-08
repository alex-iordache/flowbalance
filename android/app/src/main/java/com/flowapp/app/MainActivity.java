package com.flowapp.app;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.os.Build;
import android.os.Bundle;
import android.webkit.CookieManager;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  private static boolean isOnline(Context ctx) {
    try {
      ConnectivityManager cm = (ConnectivityManager) ctx.getSystemService(Context.CONNECTIVITY_SERVICE);
      if (cm == null) return true;
      Network nw = cm.getActiveNetwork();
      if (nw == null) return false;
      NetworkCapabilities caps = cm.getNetworkCapabilities(nw);
      if (caps == null) return false;
      return caps.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET);
    } catch (Exception ignored) {
      return true;
    }
  }

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Remote-first with local fallback:
    // If the device is offline at launch, load the bundled web assets so the app can render and show the offline overlay.
    // (Without this, iOS/Android WebView can show "Webpage not available" before any JS runs.)
    if (!isOnline(this)) {
      try {
        this.getBridge().getWebView().stopLoading();
        // Prefer Capacitor scheme if available; fall back to android_asset if needed.
        this.getBridge().getWebView().loadUrl("capacitor://localhost/index.html");
      } catch (Exception ignored) {
        try {
          this.getBridge().getWebView().loadUrl("file:///android_asset/public/index.html");
        } catch (Exception ignored2) {
          // ignore
        }
      }
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
