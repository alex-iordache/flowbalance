package com.flowapp.app;

import com.getcapacitor.BridgeActivity;
import android.os.Bundle;
import android.webkit.WebSettings;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Clerk renders different SignUp UI inside Android WebView (UA contains "; wv").
    // Remove the WebView token so Clerk treats it like a normal mobile browser.
    try {
      WebSettings settings = this.getBridge().getWebView().getSettings();
      String ua = settings.getUserAgentString();
      if (ua != null) {
        ua = ua.replace("; wv", "");
        // WebView UA commonly includes "Version/4.0" which is also a WebView marker.
        ua = ua.replace(" Version/4.0", "");
        settings.setUserAgentString(ua);
      }
    } catch (Exception ignored) {
      // If anything fails, keep default UA.
    }
  }
}
