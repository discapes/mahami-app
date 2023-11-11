package com.mahamimobile;

import static androidx.core.app.NotificationCompat.FOREGROUND_SERVICE_IMMEDIATE;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Handler;
import android.os.SystemClock;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.work.ForegroundInfo;
import androidx.work.WorkManager;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

public class MainWorker extends Worker {
    public MainWorker(
            @NonNull Context context,
            @NonNull WorkerParameters params) {
        super(context, params);
    }
    Context ctx = getApplicationContext();
    @Override
    public Result doWork() {
        Log.i("mahami", "bg task");

        setForegroundAsync(createForegroundInfo());

        while (true) {
            Intent intent = new Intent("android.intent.category.LAUNCHER");
            intent.setClassName("com.mahamimobile", "com.mahamimobile.MainActivity");
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            ctx.startActivity(intent);

            Log.i("mahami", "bg task");
            SystemClock.sleep(500);
        }
        // Indicate whether the work finished successfully with the Result
        //return Result.success();
    }

    @NonNull
    private ForegroundInfo createForegroundInfo() {
        // Build a notification using bytesRead and contentLength

        String id = "ncid";
        String title = "notif title";
        String cancel = "CANCEL";
        // This PendingIntent can be used to cancel the worker
        PendingIntent intent = WorkManager.getInstance(ctx)
                .createCancelPendingIntent(getId());
         createNotificationChannel();

        Notification notification = new NotificationCompat.Builder(ctx, id)
                .setContentTitle(title)
                .setTicker(title)
                .setForegroundServiceBehavior(FOREGROUND_SERVICE_IMMEDIATE)
                .setSmallIcon(R.drawable.ic_message)
                .setOngoing(true)
                // Add the cancel action to the notification which can
                // be used to cancel the worker
                .addAction(android.R.drawable.ic_delete, cancel, intent)
                .build();

        return new ForegroundInfo(0, notification);
    }
    private void createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is not in the Support Library.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "notif channel name";
            String description = "notif channel desc";
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel("ncid", name, importance);
            channel.setDescription(description);
            // Register the channel with the system. You can't change the importance
            // or other notification behaviors after this.
            NotificationManager notificationManager = ctx.getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

}

