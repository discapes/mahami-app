package com.mahamimobile;

import android.content.Context;
import android.os.Build;

import androidx.annotation.RequiresApi;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class DataProvider {

    private Context ctx;

    public DataProvider(Context ctx) {
        this.ctx = ctx;
    }

    public int getSteps() {
        return 5;
        // TODO
    }

    public int getSleepMinutes() {
        return 60 * 8 + 52;
    }

    public int getExerciseMinutes() {
        return 43;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    public int getScreenMinutes() {
        long start = LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant().toEpochMilli();
        long end = ZonedDateTime.now().toInstant().toEpochMilli();

        UsageStatsManager usageStatsManager = ctx.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
        val stats = usageStatsManager.queryAndAggregateUsageStats(start, end)

        val total = Duration.ofMillis(stats.values.map { it.totalTimeInForeground }.sum())
        println("YOU SPENT ${total.toMinutes()} mins.")
    }
        return 5;
    }
}
