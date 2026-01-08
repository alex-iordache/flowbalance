package com.flowapp.app;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.webkit.CookieManager;
import android.webkit.WebView;
import com.getcapacitor.CapConfig;
import com.getcapacitor.BridgeActivity;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

public class MainActivity extends BridgeActivity {
  private static final String TAG = "FlowOffline";

  private static boolean isOnline(Context ctx) {
    try {
      ConnectivityManager cm = (ConnectivityManager) ctx.getSystemService(Context.CONNECTIVITY_SERVICE);
      if (cm == null) return true;
      Network nw = cm.getActiveNetwork();
      if (nw == null) return false;
      NetworkCapabilities caps = cm.getNetworkCapabilities(nw);
      if (caps == null) return false;
      // Require a *validated* network, not just "has internet capability".
      // This fixes cases where Wi‑Fi is connected but there's actually no internet.
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        return caps.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED);
      }
      return caps.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET);
    } catch (Exception ignored) {
      return true;
    }
  }

  @Override
  public void onCreate(Bundle savedInstanceState) {
    // IMPORTANT: BridgeActivity reads `this.config` when it boots the WebView.
    // If `server.url` is set and we are offline, Android can show a native "Page not found" before any JS runs.
    // So for offline launches, we boot Capacitor in *bundled* mode by removing `server.url` from config.
    boolean onlineAtLaunch = isOnline(this);
    Log.i(TAG, "onCreate: onlineAtLaunch=" + onlineAtLaunch);
    try {
      if (!onlineAtLaunch) {
        InputStream is = getAssets().open("capacitor.config.json");
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) sb.append(line);
        br.close();
        JSONObject json = new JSONObject(sb.toString());
        if (json.has("server")) {
          JSONObject server = json.optJSONObject("server");
          if (server != null) {
            server.remove("url");
          }
        }
        // Deprecated constructor is fine here; it's the only straightforward way to load an overridden JSON config.
        this.config = new CapConfig(getAssets(), json);
        Log.i(TAG, "boot config: server.url removed (bundled mode)");
      } else {
        this.config = CapConfig.loadDefault(this);
        Log.i(TAG, "boot config: default (remote-first)");
      }
    } catch (Exception ignored) {
      // If config override fails, fall back to defaults.
      this.config = CapConfig.loadDefault(this);
      Log.i(TAG, "boot config: override failed, using default");
    }

    super.onCreate(savedInstanceState);

    // If we launched offline, ensure we are actually showing the bundled app URL.
    // (Some devices may still try to show the remote error page even if the config is overridden.)
    if (!onlineAtLaunch) {
      try {
        this.getBridge().getWebView().stopLoading();
        // With server.url removed, bridge.getLocalUrl() points to the local asset server (usually https://localhost).
        String local = this.getBridge().getLocalUrl();
        Log.i(TAG, "offline launch: bridge.getLocalUrl()=" + local + " serverUrl=" + this.getBridge().getServerUrl());
        if (local != null && !local.isEmpty()) {
          Log.i(TAG, "offline launch: loadUrl(local)");
          this.getBridge().getWebView().loadUrl(local);
        } else {
          Log.i(TAG, "offline launch: loadUrl(https://localhost)");
          this.getBridge().getWebView().loadUrl("https://localhost");
        }
      } catch (Exception ignored) {
        Log.i(TAG, "offline launch: failed to force local load");
        // ignore
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
