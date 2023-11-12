package com.mahamimobile;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

public class DataCalculation {
    private final Settings userSettings;
    private final DataProvider dp;

    public DataCalculation(Settings userSettings, DataProvider dp) {
        this.userSettings = userSettings;
        this.dp = dp;
    }

    private int screentimeFromSleep(Settings settings) {
        return Math.min((dp.getSleepMinutes() * settings.sleepReward) / settings.sleepGoal, settings.sleepReward);
    }
    private int screentimeFromExercise(Settings settings) {
        return Math.min((dp.getExerciseMinutes() * settings.exerciseReward) / settings.exerciseGoal, settings.exerciseReward);
    }
    private int screentimeFromSteps(Settings settings) {
        return Math.min((dp.getSteps() * settings.stepReward) / settings.stepGoal, settings.stepReward);
    }
    private int screentimeEarned(Settings s) {
        return screentimeFromExercise(s) + screentimeFromSleep(s) + screentimeFromSteps(s);
    }
    private int pointsEarned() {
        return screentimeEarned(Settings.GLOBAL_SETTINGS);
    }

    public static int clamp(int min, int val, int max) {
        return Math.max(min, Math.min(val, max));
    }

    public int screentimeLeft() {
        return Math.min(userSettings.minScreenMinutes + screentimeEarned(userSettings),
                userSettings.maxScreenMinutes) - dp.getScreenMinutes();
    }

    public WritableMap getData() {
        WritableMap map = Arguments.createMap();
        map.putInt("exerciseDone", dp.getExerciseMinutes());
        map.putInt("sleepDone", dp.getSleepMinutes());
        map.putInt("stepsDone", dp.getSteps());

        map.putInt("exerciseGoal", userSettings.exerciseGoal);
        map.putInt("sleepGoal", userSettings.sleepGoal);
        map.putInt("stepGoal", userSettings.stepGoal);

        map.putInt("screentimeFromExercise", screentimeFromExercise(userSettings));
        map.putInt("screentimeFromSleep", screentimeFromSleep(userSettings));
        map.putInt("screentimeFromSteps", screentimeFromSteps(userSettings));
        map.putInt("screentimeEarned", screentimeEarned(userSettings));
        map.putInt("freeScreentime", userSettings.minScreenMinutes);
        map.putInt("maxScreentime", userSettings.maxScreenMinutes);
        map.putInt("screentimeUsed", dp.getScreenMinutes());

        map.putInt("pointsEarned", pointsEarned());
        return map;
    }
}

