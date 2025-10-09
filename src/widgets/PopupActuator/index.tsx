import styles from './styles.module.scss';
import Provod from '@/shared/UI/Provod';
import Channel from '@/shared/UI/icons/Channel';
import ScrewConnection from '@/shared/UI/ScrewConnection';
import React, { FC } from 'react';
import { actuatorsConnectionsLeft, actuatorsConnectionsRight, Connection } from '@/shared/configs/actuatorConnections';

const connectionsLeftBottom: number = 4;
const connectionsRightBottom: number = 4;

interface ActuatorSideProps {
    connections: Connection[];
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
            {connections.map((connection, index: number) => {
                const trigger: boolean = index > bottomIndex;
                return (
                    <div className={`${wrapClass}${trigger ? ` ${wrapReverseClass}` : ''}`}
                        key={`${connection.marker}-${index}`}>
                        <Provod
                            className={`${provodClass}${trigger ? ` ${provodReverseClass}` : ''}`}
                            rotate={trigger ? 0 : 180}
                            length={130}
                            marker={connection.marker}
                        />
                        <Channel size={'md'} />
                        <ScrewConnection
                            pointId={connection.point}
                            dropId={`${connection.point}-${connection.marker}-${index}`}
                            className={`${connectionClass}${trigger ? ` ${connectionReverseClass}` : ''}`}
                            provodLocation={trigger ? 'bottom' : 'top'}
                            textRight={connection.marker}
                        />
                    </div>
                );
            })}
        </>
    );
});

const PopupActuator: FC = () => {
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
