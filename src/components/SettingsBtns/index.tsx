'use client';

import { FC, useState } from 'react';
import styles from './styles.module.scss';
import Multimetr from '@/components/Multimetr';
import Button from '@/components/Button';
import { SettingBtns } from '@/shared/svg';

const SettingsBtns: FC = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    const buttons = [
        { id: 'btn1', width: 238, height: 35, text: 'Замерить напряжение' },
        { id: 'btn2', width: 238, height: 35, text: 'Замерить ток' },
        { id: 'btn3', width: 238, height: 35, text: 'Замерить сопротивление' },
    ];

    return (
        <>
            <div className={styles.settings}> 
                <div className={styles.settings__window}>
                    <div className={styles.settings__window__element}>
                        <p className={styles.settings__window__element__p}>
                            <span className={styles.settings__window__element__p__span}>YB08</span>
                        </p>
                        <div 
                            className={styles.settings__window__element__block} 
                            onClick={togglePopup}
                        >
                            <SettingBtns />
                            <div className={styles.settings__window__element__block__textWpapper}>
                                <p className={styles.settings__window__element__block__textWpapper__text}>Какое-то название</p>
                            </div>
                        </div>
                    </div>

                    {isPopupVisible && (
                        <div className={styles.settings__window__popup}>
                            <Multimetr />
                        </div>
                    )}
                </div>

                <div className={styles.settings__btns}>
                    {buttons.map((button) => (
                        <Button
                            key={button.id}
                            id={button.id}
                            width={button.width}
                            height={button.height}
                            text={button.text}
                            className={styles.settings__btns__item} 
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default SettingsBtns;