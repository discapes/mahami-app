package com.mahamimobile;

import android.app.Application;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.work.OneTimeWorkRequest;
import androidx.work.WorkManager;
import androidx.work.WorkRequest;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.soloader.SoLoader;

import java.util.Collections;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    public static Handler mqProcessor = new Handler(Looper.getMainLooper()) {
        @Override
        public void handleMessage(Message msg) {
            // Process messages here based on message type
            switch (msg.what) {
                case 0:
                    Log.i("mahami", "Message type 1 received");
                    if (stepModule != null)
                     stepModule.sendEvent("stepsChanged", Arguments.createMap());
                    break;
            }
        }
    };

    static StepModule stepModule = null;

    private ReactNativeHost reactNativeHost = new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            List<ReactPackage> packages = new PackageList(this).getPackages();
            packages.add(new ReactPackage() {
                @Override
                public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
                    return Collections.emptyList();
                }

                @Override
                public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
                    stepModule = new StepModule(reactContext);
                    return List.of(stepModule);
                }
            });
            return packages;
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }

        @Override
        protected boolean isNewArchEnabled() {
            return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected Boolean isHermesEnabled() {
            return BuildConfig.IS_HERMES_ENABLED;
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return reactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            // If you opted-in for the New Architecture, we load the native entry point for this app.
            DefaultNewArchitectureEntryPoint.load();
        }
        ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());

        Log.w("mahami", "App created, stepModule: " + (stepModule != null));
    }
}
