'use client';

import React from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '@/store/sidebarSlice';
import Button from '@c/Button';
import type { RootState } from '@/store/store';

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <>
      <button
        onClick={handleToggleSidebar}
        className={styles.openButton}
      >
        <svg
          className={styles.rotatedSvg} 
          width="8"
          height="18"
          viewBox="0 0 8 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M-3.93402e-07 9L8 -3.49691e-07L8 5.12227L4.54307 9L8 12.8777L8 18L-3.93402e-07 9Z"
            fill="black"
          />
        </svg>
      </button>

      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarContent}>
          <Button
            id="main-button" 
            width={90}
            height={34}
            text='Главная'
            onClick={() => {
              console.log('Кнопка Главная нажата');
            }}
            className={styles.menuButton}
            aria-label="Главная"
          />

          <Button
            id="scheme-button"
            width={90}
            height={34}
            text='Схема'
            onClick={() => {
              console.log('Кнопка Схема нажата');
            }}
            className={styles.menuButton}
            aria-label="Схема" 
          />

          <Button
            id="training-button"
            width={90}
            height={34}
            text='Обучение'
            onClick={() => {
              console.log('Кнопка Обучение нажата');
            }}
            className={styles.menuButton}
            aria-label="Обучение"
          />
        </div>

        <button
          onClick={handleToggleSidebar}
          className={`${styles.toggleButton} ${isSidebarOpen ? styles.visible : ''}`}
        >
          <div className={styles.toggleButtonInner}>
            <div className={styles.toggleButtonLeft}></div>
            <div className={styles.toggleButtonRight}></div>
            <svg
              className={styles.toggleButtonIcon}
              width="8"
              height="18"
              viewBox="0 0 8 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M-3.93402e-07 9L8 -3.49691e-07L8 5.12227L4.54307 9L8 12.8777L8 18L-3.93402e-07 9Z"
                fill="black"
                className={styles.toggleButtonIconPath}
              />
            </svg>
          </div>
        </button>
      </div>
    </>
  );
};

export default Sidebar;