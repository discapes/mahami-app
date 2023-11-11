package com.mahamimobile; // replace your-apps-package-name with your app’s package name

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
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

import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import android.hardware.Sensor;
import android.hardware.SensorManager;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

public class StepModule extends ReactContextBaseJavaModule {
    ReactContext rctx = getReactApplicationContext();
    Context ctx = rctx.getApplicationContext();

    StepModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "StepModule";
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @ReactMethod
    public void getUsage(Promise promise) {
        UsageStatsManager usageStatsManager = (UsageStatsManager) ctx.getSystemService(Context.USAGE_STATS_SERVICE);

        Calendar beginCal = Calendar.getInstance();
        beginCal.set(Calendar.DATE, 1);
        beginCal.set(Calendar.MONTH, 0);
        beginCal.set(Calendar.YEAR, 2000);

        Calendar endCal = Calendar.getInstance();
        endCal.set(Calendar.DATE, 1);
        endCal.set(Calendar.MONTH, 0);
        endCal.set(Calendar.YEAR, 2040);

        List<UsageStats> usList = usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_YEARLY, beginCal.getTimeInMillis(), endCal.getTimeInMillis());

        List<String> names = usList.stream().map(us -> us.getPackageName()).collect(Collectors.toList());

        WritableArray wArr = Arguments.createArray();
        names.forEach(name -> wArr.pushString(name));
        promise.resolve(wArr);
    }

    public void sendEvent(String eventName, @Nullable WritableMap params) {
        rctx.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }

    private int listenerCount = 0;

    @ReactMethod
    public void addListener(String eventName) {
        SensorManager sensorManager = (SensorManager) ctx.getSystemService(Context.SENSOR_SERVICE);
        Sensor stepCounter = sensorManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER);

        sensorManager.registerListener(new SensorEventListener() {
            @Override
            public void onSensorChanged(SensorEvent sensorEvent) {
                Log.i("mahami", "Event!!");
                WritableMap params = Arguments.createMap();
                params.putDouble("steps", sensorEvent.values[0]);
                sendEvent("stepsChanged", params);
            }

            @Override
            public void onAccuracyChanged(Sensor sensor, int i) {

            }
        }, stepCounter, SensorManager.SENSOR_DELAY_NORMAL);

        if (listenerCount == 0) {
            // Set up any upstream listeners or background tasks as necessary
        }

        listenerCount += 1;
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        listenerCount -= count;
        if (listenerCount == 0) {
            // Remove upstream listeners, stop unnecessary background tasks
        }
    }

    @ReactMethod
    public void changeSetting(String fieldName, int value) {
        Settings settings = Settings.USER_SETTINGS;
        switch (fieldName) {
            case "sleepGoal":
                settings.sleepGoal = value;
                break;
            case "sleepReward":
                settings.sleepReward = value;
                break;
            case "stepGoal":
                settings.stepGoal = value;
                break;
            case "stepReward":
                settings.stepReward = value;
                break;
            case "exerciseGoal":
                settings.exerciseGoal = value;
                break;
            case "exerciseReward":
                settings.exerciseReward = value;
                break;
            case "minScreenMinutes":
                settings.minScreenMinutes = value;
                break;
            case "maxScreenMinutes":
                settings.maxScreenMinutes = value;
                break;
            default:
                System.out.println("Invalid field name: " + fieldName);
                break;
        }
    }
}