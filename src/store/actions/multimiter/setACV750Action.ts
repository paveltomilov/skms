import {PayloadAction} from '@reduxjs/toolkit';
import {WritableDraft} from 'immer';
import {MultimeterState} from '@/shared/types/multimeter';
import {MultimeterModePropPayload} from '@/store/multimeterSlice';

/**
 * Экшен мультиметра в режиме ACV_750
 * @param state {WritableDraft<MultimeterState>} состояние хранилища
 * @param action {red: boolean|undefined, black: boolean|undefined} данные по состоянию напряжения на точках щюпа
 */
export const setACV750Action = (
    state: WritableDraft<MultimeterState>,
    action: PayloadAction<MultimeterModePropPayload>
): void => {
    const {payload: {red, black}} = action;
    if (typeof red.state === 'undefined' || typeof black.state === 'undefined') {
        state.displayValue = 0;
    } else if ((red.isNeutral && black.state) || (black.isNeutral && red.state)) {
        state.displayValue = 220;
    } else {
        state.displayValue = 0;
    }
};