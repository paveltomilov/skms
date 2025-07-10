import {PayloadAction} from '@reduxjs/toolkit';
import {WritableDraft} from 'immer';
import {MultimeterState} from '@/shared/types/multimeter';

/**
 * Экшен установки значения вольтметра
 * @param state {WritableDraft<MultimeterState>} состояние хранилища
 * @param payload {red: boolean|undefined, black: boolean|undefined} данные по состоянию напряжения на точках щюпа
 */
export const setDisplayVoltageAction = (
    state: WritableDraft<MultimeterState>,
    {payload}: PayloadAction<{ red: boolean | undefined, black: boolean | undefined }>
) => {
    if (state.currentMode === 'OFF') {
        state.displayValue = null;
        return;
    }

    if (typeof payload.red !== 'undefined' && typeof payload.black !== 'undefined') {
        state.displayValue = payload.red === payload.black ? 0.0 : 220.0;
    } else {
        state.displayValue = 0;
    }
};