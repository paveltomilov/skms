'use client';
import styles from './styles.module.scss';
import {Display} from '@/entities/Display';
import ControlPanel from '@/entities/ControlPanel';
import {useAppDispatch, useAppSelector} from '@/shared/hooks/store';
import ProbeHolder from '@/shared/UI/icons/ProbeHolder';
import Probe from '@/entities/Probe';
import {useEffect} from 'react';
import {getMultimeterAction} from '@/widgets/Multimeter/getMultimeterAction';
import {MultimeterModePropPayload} from '@/store/multimeterSlice';

const Multimeter: React.FC = () => {
    const dispatch = useAppDispatch();
    const multimeterState = useAppSelector(state => state.multimeter);
    const activeProbe = useAppSelector(state => state.multimeter.activeProb);
    const currentMode = useAppSelector(state => state.multimeter.currentMode);
    const probeConnections = useAppSelector(
        state => state.multimeter.probeConnections,
    );

    //Состояния напряжения на точках измерения
    const probeState: MultimeterModePropPayload = useAppSelector(
        state => {
            const redPoint = state.multimeter.probeConnections.red;
            const blackPoint = state.multimeter.probeConnections.black;
            const redIsActive = state.points[redPoint as string];
            const blackIsActive = state.points[blackPoint as string];
            return {
                red: {isNeutral: redPoint === 'p.c.n', state: redIsActive},
                black: {isNeutral: blackPoint === 'p.c.n', state: blackIsActive}
            };
        }
    );

    //Экшен для текущего режима мультиметра
    const modeAction = getMultimeterAction(currentMode);

    //Отслеживание изменения напряжения на щупах
    useEffect(() => {
        dispatch(modeAction(probeState));
    }, [probeState, modeAction]);

    return (
        <div className={styles.multimeter}>
            <Display value={multimeterState.displayValue}/>
            <ControlPanel mode={multimeterState.currentMode}/>
            <ProbeHolder
                className={`${styles.multimeter__probeHolder} ${styles.multimeter__probeHolder_black}`}
            >
                {/* если щуп не перетаскивается и не прикреплен к схеме, он рендерится мультиметром */}
                {activeProbe !== 'black' && !probeConnections['black'] && (
                    <Probe color="black"/>
                )}
            </ProbeHolder>
            <ProbeHolder
                className={`${styles.multimeter__probeHolder} ${styles.multimeter__probeHolder_red}`}
            >
                {/* если щуп не перетаскивается и не прикреплен к схеме, он рендерится мультиметром */}
                {activeProbe !== 'red' && !probeConnections['red'] && (
                    <Probe color="red"/>
                )}
            </ProbeHolder>
        </div>
    );
};

export default Multimeter;
