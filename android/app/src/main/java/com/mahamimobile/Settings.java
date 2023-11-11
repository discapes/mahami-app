package com.mahamimobile;

public class Settings {
    public int sleepGoal;
    public int sleepReward;
    public int stepGoal;
    public int stepReward;
    public int exerciseGoal;
    public int exerciseReward;

    public int minScreenMinutes;

    public int maxScreenMinutes;

    public Settings(int sleepGoal, int sleepReward, int stepGoal, int stepReward, int exerciseGoal, int exerciseReward, int minScreenMinutes, int maxScreenMinutes) {
        this.sleepGoal = sleepGoal;
        this.sleepReward = sleepReward;
        this.stepGoal = stepGoal;
        this.stepReward = stepReward;
        this.exerciseGoal = exerciseGoal;
        this.exerciseReward = exerciseReward;
        this.minScreenMinutes = minScreenMinutes;
        this.maxScreenMinutes = maxScreenMinutes;
    }

    // TODO
    public static final Settings GLOBAL_SETTINGS = new Settings(10,10,10,10,10,10,10,10);
    public static Settings USER_SETTINGS = new Settings(10,10,10,10,10,10,10,10);
}
