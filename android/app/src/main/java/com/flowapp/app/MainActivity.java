package com.flowapp.app;

import android.os.Bundle;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Enable remote debugging (chrome://inspect) for Android WebView in debug builds.
    if (BuildConfig.DEBUG) {
      WebView.setWebContentsDebuggingEnabled(true);
    }
  }
}
