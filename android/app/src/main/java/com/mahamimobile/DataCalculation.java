package com.mahamimobile;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

public class DataCalculation {
    private final Settings settings;
    private final DataProvider dp;

    public DataCalculation(Settings settings, DataProvider dp) {
        this.settings = settings;
        this.dp = dp;
    }

    private int calcEarnedPoints(Settings s) {
        int sleepPoints = Math.min(dp.getSleepMinutes() / s.sleepGoal, 1) * s.sleepReward;
        int stepPoints = Math.min(dp.getSteps() / s.stepGoal, 1) * s.stepReward;
        int exercisePoints = Math.min(dp.getExerciseMinutes() / s.exerciseGoal, 1) * s.exerciseReward;
        return sleepPoints + stepPoints + exercisePoints;
    }

    public int minutesEarned() {
        return calcEarnedPoints(settings);
    }

    public int pointsEarned() {
        return calcEarnedPoints(Settings.GLOBAL_SETTINGS);
    }

    public static int clamp(int min, int val, int max) {
        return Math.max(min, Math.min(val, max));
    }

    public int minutesLeft() {
        int minutesAvailable = clamp(settings.minScreenMinutes, this.minutesEarned() ,settings.maxScreenMinutes);
        return minutesAvailable - dp.getScreenMinutes();
    }

    public boolean isOutOfTIme() {
        return minutesLeft() <= 0;
    }

    public WritableMap getData() {
        WritableMap map = Arguments.createMap();
        map.putInt("minutesEarned", minutesEarned());
        map.putInt("pointsEarned", pointsEarned());
        map.putInt("steps", dp.getSteps());
        map.putInt("sleepMinutes", dp.getSleepMinutes());
        map.putInt("exerciseMinutes", dp.getExerciseMinutes());
        map.putInt("minutesLeft", minutesLeft());
        return map;
    }
}

