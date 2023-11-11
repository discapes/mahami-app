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
import android.os.Looper;
import android.os.Message;
import android.os.SystemClock;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.work.ForegroundInfo;
import androidx.work.WorkManager;
import androidx.work.Worker;
import androidx.work.WorkerParameters;
import androidx.work.Data;

import com.facebook.react.bridge.Arguments;

public class MainWorker extends Worker {
    public MainWorker(@NonNull Context context, @NonNull WorkerParameters params) {
        super(context, params);
    }

    Context ctx = getApplicationContext();

    private void interrupt() {
        Intent intent = new Intent("android.intent.category.LAUNCHER");
        intent.setClassName("com.mahamimobile", "com.mahamimobile.MainActivity");
        // When using this flag, if a task is already running for
        // the activity you are now starting, then a new activity will not be started;
        // instead, the current task will simply be brought to the front of the screen
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        ctx.startActivity(intent);
    }


    @Override
    public Result doWork() {
        Log.i("mahami", "Starting main worker...");
        setForegroundAsync(createForegroundInfo());

        DataProvider dp = new DataProvider();
        Settings settings = Settings.GLOBAL_SETTINGS;
        DataCalculation dc = new DataCalculation(settings, dp);

        while (true) {
            Log.i("mahami", "tick from bg thread");
            if (dc.isOutOfTIme())
                interrupt();
            if (MainApplication.stepModule != null)
                MainApplication.stepModule.sendEvent("stepsChanged", dc.getData());
            SystemClock.sleep(200);
        }
    }

    @NonNull
    private ForegroundInfo createForegroundInfo() {
        Notification notification = new NotificationCompat.Builder(ctx, "mahami")
                .setContentTitle("Mahami")
                .setSmallIcon(R.drawable.ic_message)
                .setOngoing(true)
                .build();
        return new ForegroundInfo(0, notification);
    }
}

