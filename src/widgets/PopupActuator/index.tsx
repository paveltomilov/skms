import styles from './styles.module.scss';
import Provod from '@/shared/UI/Provod';
import Channel from '@/shared/UI/icons/Channel';
import ScrewConnection from '@/shared/UI/ScrewConnection';
import {MarkerName} from '@/shared/types/markers';
import React, {FC} from 'react';

const actuatorsConnectionsLeft: MarkerName[] = ['A1', 'B1', 'C1', 'A2', 'A13', 'A21', 'B21', 'C21', 'A13', 'N'];
const actuatorsConnectionsRight: MarkerName[] = ['L1', 'L2', 'L3', 'A4', 'A21', 'A21', 'B21', 'C21', 'A21', 'N'];
const connectionsLeftBottom: number = actuatorsConnectionsLeft.indexOf('A13');
const connectionsRightBottom: number = actuatorsConnectionsRight.indexOf('A21');

interface ActuatorSideProps {
    connections: MarkerName[];
    bottomIndex: number;
    wrapClass: string;
    wrapReverseClass: string;
    provodClass: string;
    provodReverseClass: string;
    connectionClass: string;
    connectionReverseClass: string;
}

const ActuatorSide = React.memo(({
                          connections,
                          bottomIndex,
                          wrapClass,
                          wrapReverseClass,
                          provodClass,
                          provodReverseClass,
                          connectionClass,
                          connectionReverseClass,
                      }: ActuatorSideProps) => {
    return (
        <>
            {connections.map((connectionsName:MarkerName, index: number) => {
                const trigger: boolean = index > bottomIndex;
                return (
                    <div className={`${wrapClass}${trigger ? ` ${wrapReverseClass}` : ''}`}
                         key={`${connectionsName}-${index}`}>
                        <Provod
                            className={`${provodClass}${trigger ? ` ${provodReverseClass}` : ''}`}
                            rotate={trigger ? 0 : 180}
                            length={130}
                            marker={connectionsName}
                        />
                        <Channel size={'md'}/>
                        <ScrewConnection
                            className={`${connectionClass}${trigger ? ` ${connectionReverseClass}` : ''}`}
                            provodLocation={trigger ? 'bottom' : 'top'}
                            textRight={connectionsName}
                        />
                    </div>
                );
            })}
        </>
    );
});

const PopupActuator:FC = () => {
    return (
        <div className={styles.actuator_container}>
            <div className={styles.actuator_container_inner}>
                <div className={styles.inner_left}>
                    <ActuatorSide
                        connections={actuatorsConnectionsLeft}
                        bottomIndex={connectionsLeftBottom}
                        wrapClass={styles.inner_left_wrap}
                        wrapReverseClass={styles.inner_left__reverse}
                        provodClass={styles.inner_left_wrap__provod}
                        provodReverseClass={styles.inner_left_wrap__reverse}
                        connectionClass={styles.inner_left_wrap__connection}
                        connectionReverseClass={styles.inner_left__reverse__bottom}
                    />
                </div>
                <div className={styles.inner_right}>
                    <ActuatorSide
                        connections={actuatorsConnectionsRight}
                        bottomIndex={connectionsRightBottom}
                        wrapClass={styles.inner_right_wrap}
                        wrapReverseClass={styles.inner_right__reverse}
                        provodClass={styles.inner_right_wrap__provod}
                        provodReverseClass={styles.inner_right_wrap__reverse}
                        connectionClass={styles.inner_right_wrap__connection}
                        connectionReverseClass={styles.inner_right__reverse__bottom}
                    />
                </div>
            </div>
        </div>
    );
};

ActuatorSide.displayName = 'ActuatorSide';
export default PopupActuator;