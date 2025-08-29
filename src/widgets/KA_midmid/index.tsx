import styles from './styles.module.scss';
import {FC} from 'react';
import cn from 'classnames';
import Window from '@/shared/UI/Window';
import {WINDOWS} from '@/shared/configs/window';


interface Props {
    className?: string;
}

const KAMidMid: FC<Props> = ({className}) => {
    return (
        <div className={cn(className, styles.container)}>
            <Window data={WINDOWS.w162} right colorText={'white'} className={styles.container_element}/>
            <Window data={WINDOWS.w164} right colorText={'white'} className={styles.container_element}/>
            <div className={styles.container_element}>
                <span className={styles.container_element__item}>
                    Топка
                </span>
                <span className={styles.container_element__item}></span>
                <span className={styles.container_element__item}>
                    Потускнение факела
                </span>
            </div>
            <Window data={WINDOWS.w163} right colorText={'white'} className={styles.container_element}/>
            <div className={styles.container_element}>
                <Window data={WINDOWS.w165} right color={'yellow'} className={styles.container_element__item}/>
                <Window data={WINDOWS.w166} right left textLeft={'А'} className={styles.container_element__item}/>
                <Window data={WINDOWS.w167} right left textLeft={'Б'} className={styles.container_element__item}/>
                <Window data={WINDOWS.w168} right color={'yellow'} className={styles.container_element__item}/>
            </div>
            <Window data={WINDOWS.w169} right colorText={'white'} className={styles.container_element}/>
            <div className={styles.container_element}>
                <span className={styles.container_element__item}>ПВ</span>
                <span className={styles.container_element__item}>ВЭК</span>
            </div>
            <Window data={WINDOWS.w170} right left textLeft={'O2'} colorText={'white'} className={styles.container_element}/>
            <div className={styles.container_element}>
                <Window data={WINDOWS.w171} right left textLeft={'O2'} colorText={'white'} className={styles.container_element__item}/>
                <Window data={WINDOWS.w172} right colorText={'white'} className={styles.container_element__item}/>
                <Window data={WINDOWS.w173} right colorText={'white'} className={styles.container_element__item}/>
            </div>
        </div>
    );
};

export default KAMidMid;