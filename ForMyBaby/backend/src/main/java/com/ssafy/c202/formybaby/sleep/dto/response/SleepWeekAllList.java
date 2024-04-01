package com.ssafy.c202.formybaby.sleep.dto.response;

import com.ssafy.c202.formybaby.sleep.entity.Danger;
import com.ssafy.c202.formybaby.sleep.entity.Sleep;

import java.util.List;

public record SleepWeekAllList(
        int[] sleepList,
        int[] dangerList,

        int[] hoursList
) {
}
