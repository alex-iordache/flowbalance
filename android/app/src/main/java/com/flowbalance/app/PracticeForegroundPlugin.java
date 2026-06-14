package com.flowbalance.app;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.util.Log;
import androidx.core.content.ContextCompat;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

@CapacitorPlugin(
  name = "PracticeForeground",
  permissions = {
    @Permission(strings = { Manifest.permission.POST_NOTIFICATIONS }, alias = "notifications")
  }
)
public class PracticeForegroundPlugin extends Plugin {
  private static final String TAG = "PracticeForeground";
  static final String NOTIFICATIONS = "notifications";

  @PluginMethod
  public void ensurePermissions(PluginCall call) {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) {
      call.resolve(permissionResult(true));
      return;
    }
    if (hasNotificationPermission()) {
      Log.i(TAG, "ensurePermissions: already granted");
      call.resolve(permissionResult(true));
      return;
    }

    Log.i(TAG, "ensurePermissions: requesting POST_NOTIFICATIONS");
    requestPermissionForAlias(NOTIFICATIONS, call, "notificationsPermsCallback");
  }

  @PermissionCallback
  private void notificationsPermsCallback(PluginCall call) {
    if (call == null) {
      Log.w(TAG, "notificationsPermsCallback: call was null");
      return;
    }
    boolean granted = hasNotificationPermission();
    Log.i(TAG, "notificationsPermsCallback: granted=" + granted);
    call.resolve(permissionResult(granted));
  }

  @PluginMethod
  public void openNotificationSettings(PluginCall call) {
    try {
      Intent intent = new Intent();
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        intent.setAction(Settings.ACTION_APP_NOTIFICATION_SETTINGS);
        intent.putExtra(Settings.EXTRA_APP_PACKAGE, getContext().getPackageName());
      } else {
        intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        intent.setData(Uri.parse("package:" + getContext().getPackageName()));
      }
      intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
      getActivity().startActivity(intent);
      call.resolve();
    } catch (Exception e) {
      call.reject("Failed to open notification settings", e);
    }
  }

  @PluginMethod
  public void start(PluginCall call) {
    Log.i(TAG, "start foreground service");
    startForegroundService(call, true);
  }

  @PluginMethod
  public void update(PluginCall call) {
    Boolean playing = call.getBoolean("playing", null);
    updateForegroundService(call, playing == null || playing);
  }

  @PluginMethod
  public void stop(PluginCall call) {
    Log.i(TAG, "stop foreground service");
    Intent intent = new Intent(getContext(), PracticeForegroundService.class);
    intent.setAction(PracticeForegroundService.ACTION_STOP);
    getContext().startService(intent);
    call.resolve();
  }

  private void startForegroundService(PluginCall call, boolean playing) {
    Intent intent = buildIntent(call, PracticeForegroundService.ACTION_START, playing);
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      getContext().startForegroundService(intent);
    } else {
      getContext().startService(intent);
    }
    call.resolve();
  }

  private void updateForegroundService(PluginCall call, boolean playing) {
    Intent intent = buildIntent(call, PracticeForegroundService.ACTION_UPDATE, playing);
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      getContext().startForegroundService(intent);
    } else {
      getContext().startService(intent);
    }
    call.resolve();
  }

  private Intent buildIntent(PluginCall call, String action, boolean playing) {
    String title = call.getString("title", "Flow");
    String body = call.getString("body", "Practice");
    Intent intent = new Intent(getContext(), PracticeForegroundService.class);
    intent.setAction(action);
    intent.putExtra(PracticeForegroundService.EXTRA_TITLE, title);
    intent.putExtra(PracticeForegroundService.EXTRA_BODY, body);
    intent.putExtra(PracticeForegroundService.EXTRA_PLAYING, playing);
    return intent;
  }

  private boolean hasNotificationPermission() {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) {
      return true;
    }
    return (
      ContextCompat.checkSelfPermission(getContext(), Manifest.permission.POST_NOTIFICATIONS) ==
      PackageManager.PERMISSION_GRANTED
    );
  }

  private JSObject permissionResult(boolean granted) {
    JSObject result = new JSObject();
    result.put("granted", granted);
    return result;
  }
}
