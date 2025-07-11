import {MultimeterMode} from '@/shared/types/multimeter';
import {MultimeterModePropPayload, powerOff, setACV750, stubMode} from '@/store/multimeterSlice';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';

//Типы для принимаемых значений экшенов
type MultimeterActionsPayload = {
    OFF: void;
    ACV_750: MultimeterModePropPayload;
    ACV_200: void;
    DCA_200u: void;
    DCA_2000u: void;
    DCA_20m: void;
    DCA_200m: void;
    DCA_10A: void;
    HFE: void;
    DIODE: void;
    OHM_2000k: void;
    OHM_200k: void;
    OHM_20k: void;
    OHM_2000: void;
    OHM_200: void;
    DCV_1000: void;
    DCV_200: void;
    DCV_20: void;
    DCV_2000m: void;
    DCV_200m: void;
};

//Экшены режимов мультиметра
const actions: {
    [K in MultimeterMode]: ActionCreatorWithPayload<MultimeterActionsPayload[K]>
} = {
    OFF: powerOff,
    ACV_750: setACV750,
    ACV_200: stubMode,
    DCA_200u: stubMode,
    DCA_2000u: stubMode,
    DCA_20m: stubMode,
    DCA_200m: stubMode,
    DCA_10A: stubMode,
    HFE: stubMode,
    DIODE: stubMode,
    OHM_2000k: stubMode,
    OHM_200k: stubMode,
    OHM_20k: stubMode,
    OHM_2000: stubMode,
    OHM_200: stubMode,
    DCV_1000: stubMode,
    DCV_200: stubMode,
    DCV_20: stubMode,
    DCV_2000m: stubMode,
    DCV_200m: stubMode,
};

/**
 * Получить экшен по режиму мультиметра
 * @param mode {MultimeterMode} режим мультиметра
 */
export const getMultimeterAction =
    <M extends MultimeterMode>(mode: M): ActionCreatorWithPayload<MultimeterActionsPayload[M]> => {
        return actions[mode];
    };