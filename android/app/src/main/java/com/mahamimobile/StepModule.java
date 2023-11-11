package com.mahamimobile; // replace your-apps-package-name with your app’s package name
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class StepModule extends ReactContextBaseJavaModule {
    StepModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "StepModule";
    }

    @ReactMethod
    public void getSteps(Promise promise) {
        promise.resolve("asdf__");
    }
}