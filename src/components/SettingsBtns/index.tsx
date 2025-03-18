'use client';

import { FC, useState } from 'react';
import styles from './styles.module.scss';
import Multimetr from '@/components/Multimetr';
import Button from '@/components/Button';

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
                            <svg width="74" height="35" viewBox="0 0 74 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M73 0.5H1V34.5H73V0.5Z" stroke="black" stroke-miterlimit="10"/>
                                <path d="M53.6928 17.5H48.6807" stroke="black" stroke-miterlimit="10"/>
                                <path d="M20 17.5H25.9786L48.3739 7.5" stroke="black" stroke-miterlimit="10"/>
                                <path d="M20 8.5H1V26.5H20V8.5Z" fill="white" stroke="black" stroke-miterlimit="10"/>
                                <path d="M73 8.5H54V26.5H73V8.5Z" fill="white" stroke="black" stroke-miterlimit="10"/>
                            </svg>
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