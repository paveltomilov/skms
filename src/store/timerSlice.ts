import { createSlice } from '@reduxjs/toolkit';

interface TimerState {
    isRunning: boolean;
    seconds: number;
    finishTime: number;
};

const initialState: TimerState = {
    isRunning: false,
    seconds: 0,
    finishTime: 0,
};

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        tickTimer: (state) => {
            state.seconds += 1;
        },
        startTimer: (state) => {
            state.isRunning = true;
        },
        stopTimer: (state) => {
            state.isRunning = false;
            state.finishTime = state.seconds;
        },
        resetTimer: () => initialState,
    },
});

export const { tickTimer, startTimer, stopTimer, resetTimer } = timerSlice.actions;
export default timerSlice.reducer;