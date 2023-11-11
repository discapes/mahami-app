package com.mahamimobile; // replace your-apps-package-name with your app’s package name
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;
import android.content.Intent;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.os.Build;
import android.provider.Settings;

import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import android.hardware.Sensor;
import android.hardware.SensorManager;

import androidx.annotation.RequiresApi;

public class StepModule extends ReactContextBaseJavaModule {
    StepModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "StepModule";
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @ReactMethod
    public void getSteps(Promise promise) {
        Context ctx = getReactApplicationContext().getApplicationContext();
     //   Intent intent = new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS);
     //   ctx.startActivity(intent);
        SensorManager sm = (SensorManager) ctx.getSystemService(Context.SENSOR_SERVICE);
        Sensor stepCounter = sm.getDefaultSensor(Sensor.TYPE_STEP_COUNTER);
        sm.registerListener(new SensorEventListener() {
            @Override
            public void onSensorChanged(SensorEvent sensorEvent) {
                promise.resolve(sensorEvent.values[0]);
            }

            @Override
            public void onAccuracyChanged(Sensor sensor, int i) {

            }
        }, stepCounter, SensorManager.SENSOR_DELAY_NORMAL);

        UsageStatsManager usm = (UsageStatsManager) ctx.getSystemService(Context.USAGE_STATS_SERVICE);

        Calendar beginCal = Calendar.getInstance();
        beginCal.set(Calendar.DATE, 1);
        beginCal.set(Calendar.MONTH, 0);
        beginCal.set(Calendar.YEAR, 2000);

        Calendar endCal = Calendar.getInstance();
        endCal.set(Calendar.DATE, 1);
        endCal.set(Calendar.MONTH, 0);
        endCal.set(Calendar.YEAR, 2040);

        List<UsageStats> usList = usm.queryUsageStats(
                UsageStatsManager.INTERVAL_YEARLY,
                beginCal.getTimeInMillis(),
                endCal.getTimeInMillis());

        List<String> names = usList.stream().map(us -> us.getPackageName()).collect(Collectors.toList());

        WritableArray wArr = Arguments.createArray();
        names.forEach(name -> wArr.pushString(name));

        //promise.resolve(wArr);
    }
}