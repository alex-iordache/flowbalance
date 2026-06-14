package com.flowbalance.app;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.content.pm.ServiceInfo;
import android.os.Build;
import android.os.IBinder;
import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

/**
 * Minimal foreground service to keep practice audio alive in the background.
 * Lock-screen and notification media controls are handled by Capgo NativeAudio
 * ({@code showNotification: true}), not this service.
 */
public class PracticeForegroundService extends Service {
  public static final int NOTIFICATION_ID = 9001;
  public static final String CHANNEL_ID = "flow_practice_background";
  public static final String ACTION_START = "com.flowbalance.app.action.START_PRACTICE_FG";
  public static final String ACTION_UPDATE = "com.flowbalance.app.action.UPDATE_PRACTICE_FG";
  public static final String ACTION_STOP = "com.flowbalance.app.action.STOP_PRACTICE_FG";
  public static final String EXTRA_TITLE = "title";
  public static final String EXTRA_BODY = "body";
  public static final String EXTRA_PLAYING = "playing";

  private static String currentTitle = "Flow";
  private static String currentBody = "Practice";

  @Nullable
  @Override
  public IBinder onBind(Intent intent) {
    return null;
  }

  @Override
  public int onStartCommand(Intent intent, int flags, int startId) {
    if (intent == null) {
      return START_NOT_STICKY;
    }

    if (ACTION_STOP.equals(intent.getAction())) {
      stopForegroundService();
      return START_NOT_STICKY;
    }

    if (intent.hasExtra(EXTRA_TITLE)) {
      String title = intent.getStringExtra(EXTRA_TITLE);
      if (title != null && !title.isEmpty()) {
        currentTitle = title;
      }
    }
    if (intent.hasExtra(EXTRA_BODY)) {
      String body = intent.getStringExtra(EXTRA_BODY);
      if (body != null) {
        currentBody = body;
      }
    }

    boolean playing = intent.getBooleanExtra(EXTRA_PLAYING, true);
    showForeground(playing);
    return START_STICKY;
  }

  private void stopForegroundService() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
      stopForeground(STOP_FOREGROUND_REMOVE);
    } else {
      stopForeground(true);
    }
    stopSelf();
  }

  private void showForeground(boolean playing) {
    createChannel();
    Notification notification = buildNotification(playing);
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
      startForeground(
        NOTIFICATION_ID,
        notification,
        ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK
      );
    } else {
      startForeground(NOTIFICATION_ID, notification);
    }
  }

  private void createChannel() {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
      return;
    }
    NotificationChannel channel = new NotificationChannel(
      CHANNEL_ID,
      "Background playback",
      NotificationManager.IMPORTANCE_LOW
    );
    channel.setDescription("Keeps practice audio playing when the screen is off");
    channel.setShowBadge(false);
    NotificationManager manager = getSystemService(NotificationManager.class);
    if (manager != null) {
      manager.createNotificationChannel(channel);
    }
  }

  private Notification buildNotification(boolean playing) {
    Intent launchIntent = getPackageManager().getLaunchIntentForPackage(getPackageName());
    PendingIntent contentIntent = null;
    if (launchIntent != null) {
      contentIntent = PendingIntent.getActivity(
        this,
        0,
        launchIntent,
        PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
      );
    }

    NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
      .setContentTitle(currentTitle)
      .setContentText(currentBody.isEmpty() ? "Practice" : currentBody)
      .setSmallIcon(android.R.drawable.ic_media_play)
      .setOngoing(playing)
      .setOnlyAlertOnce(true)
      .setSilent(true)
      .setPriority(NotificationCompat.PRIORITY_LOW)
      .setCategory(NotificationCompat.CATEGORY_SERVICE);

    if (contentIntent != null) {
      builder.setContentIntent(contentIntent);
    }
    return builder.build();
  }
}
