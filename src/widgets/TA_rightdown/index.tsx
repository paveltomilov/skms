import styles from './style.module.scss';
import {FC} from 'react';
import cn from 'classnames';
import Window from '@/shared/UI/Window';
import {WINDOWS} from '@/shared/configs/window';
import Button from '@/shared/UI/Button';
import {rightBottomOne} from '@/shared/utils/TAGroupElements/groupElements';
import Actuator from '@/shared/UI/Actuator';

interface Props {
    className?: string;
}

const TARightDown: FC<Props> = ({className}) => {
    return (
        <div className={cn(className)}>
            <div className={styles.container}>
                <div className={styles.container_element}>
                    <div className={styles.container_element_box}>
                        <Window
                            color={'blue'}
                            value={WINDOWS.w88.currentValue}
                            textRight={WINDOWS.w88.unitsMeasurement}
                            textBottom={WINDOWS.w88.title}
                        />
                    </div>
                    <Button
                        width={88}
                        height={28}
                        ariaLabel={'мс'}
                        text={'мс'}
                        className={styles.container_element_box__button}
                    />
                    <div className={styles.container_element_box}>
                        <Window
                            color={'blue'}
                            value={WINDOWS.w89.currentValue}
                            textRight={WINDOWS.w89.unitsMeasurement}
                            textBottom={WINDOWS.w89.title}
                        />
                    </div>
                </div>
                {rightBottomOne.map((item, index) => (
                    <div className={styles.container_element} key={index}>
                        <Actuator
                            state={item.state}
                            transform={item.transform}
                            disable={item.disabled}
                        />
                        <span className={styles.container_element__text}>
                            {item.text}
                        </span>
                    </div>
                ))}
                <div className={styles.container_element}>
                    <span className={styles.container_element__title}>
                        НГП-1А
                    </span>
                    <Actuator
                        state={'off'}
                        disable={false}
                    />
                    <Actuator
                        state={'off'}
                        disable={false}
                    />
                    <span className={styles.container_element__title}>
                        НГП-1Б
                    </span>
                </div>
                <span className={styles.container_element}>
                    к ВПУ
                </span>
                <span className={styles.container_element}>
                    мо
                </span>
                <div className={styles.container_element}>
                    <Window
                        color={'blue'}
                        value={WINDOWS.w90.currentValue}
                        textRight={WINDOWS.w90.unitsMeasurement}
                    />
                    <Window
                        color={'blue'}
                        value={WINDOWS.w92.currentValue}
                        textRight={WINDOWS.w92.unitsMeasurement}
                    />
                </div>
                <span className={styles.container_element}>
                    к подшипникам
                </span>
                <div className={styles.container_element}>
                    <Actuator
                        state={'off'}
                        transform={'rotateLeft90'}
                        disable={false}
                    />
                    <span className={styles.container_element__text}>
                        МНР-1А
                    </span>
                </div>
                <div className={styles.container_element}>
                    <Actuator
                        state={'off'}
                        transform={'rotateLeft90'}
                        disable={false}
                    />
                    <span className={styles.container_element__text}>
                        МНР-1Б
                    </span>
                </div>
                <div className={styles.container_element}>
                    <Window
                        color={'blue'}
                        value={WINDOWS.w91.currentValue}
                        textRight={WINDOWS.w91.unitsMeasurement}
                    />
                    <Window
                        color={'blue'}
                        value={WINDOWS.w93.currentValue}
                        textRight={WINDOWS.w93.unitsMeasurement}
                    />
                </div>
                <span className={styles.container_element}>
                    на регулирование
                </span>
            </div>
        </div>
    );
};

export default TARightDown;