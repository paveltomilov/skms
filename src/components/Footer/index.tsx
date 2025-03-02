'use client';

import React from 'react';
import styles from './styles.module.scss';
import Button from '@/components/Button';

const Footer = () => {
  return (
    <footer className={styles.footer} aria-label="Панель управления">
      <nav className={styles.footer__leftPanel} aria-label="Кнопки управления">
        {/* Первая строка (8 кнопок) */}
        {[...Array(16)].map((_, i) => (
          <Button 
            key={i+1}
            width={88} 
            height={28} 
            className={`${styles.footer__button} ${i < 8 ? styles['footer__button--first-row'] : ''}`} 
            aria-label={`Кнопка ${i+1}`}
          >
            {i === 0 && <span className={styles.footer__buttonText}>КА</span>}
            {i === 1 && <span className={styles.footer__buttonText}>ТА</span>}
          </Button>
        ))}
      </nav>

      <div className={styles.footer__centralPanel}>
        <div className={styles.footer__centralGroup__left}>
          <Button width={26} height={26} className={styles.footer__controlButton} aria-label="Кнопка С">С</Button>
          <Button width={26} height={26} className={styles.footer__controlButton} aria-label="Кнопка З">З</Button>
        </div>
        <div className={styles.footer__centralGroup__middle}>
          <Button width={88} height={28} className={styles.footer__mainButton} aria-label="Левый контрол">
            <svg width="48" height="18" viewBox="0 0 48 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M33.3433 0.0202898C30.7819 -0.0254212 30.4181 0.0202853 28.0841 0.0202853C28.0841 0.0202853 28.069 0.0202853 28.0538 0.0202853C28.0386 0.0202853 28.0386 0.0202853 28.0235 0.0202853C25.6895 0.0202853 23.2342 0.0659964 20.6577 0.111707C5.62288 0.401211 6.01694 7.71498 6.01694 7.71498V11.0519H0L10.2455 18L20.4909 11.0519H14.4892V7.71498C14.4892 2.91532 18.5055 1.22401 25.0226 1.22401C31.5397 1.22401 35.6167 2.8239 35.6167 7.62356H43.763H47.9991C47.9991 7.62356 48.378 0.309793 33.3433 0.0202898Z" fill="#1D1D1B"/>
            </svg>
          </Button>
          <Button width={88} height={28} className={styles.footer__mainButton} aria-label="Правый контрол">
            <svg width="48" height="18" viewBox="0 0 48 18" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M14.6567 0.0203509C17.2181 -0.0253602 17.5819 0.0203463 19.9159 0.0203463C19.9159 0.0203463 19.931 0.0203463 19.9462 0.0203463C19.9614 0.0203463 19.9614 0.0203463 19.9765 0.0203463C22.3105 0.0203463 24.7658 0.0660574 27.3423 0.111768C42.3771 0.401272 41.9831 7.71504 41.9831 7.71504V11.0519H48L37.7545 18L27.5091 11.0519H33.5108V7.71504C33.5108 2.91538 29.4945 1.22407 22.9774 1.22407C16.4603 1.22407 12.3833 2.82396 12.3833 7.62362H4.23698H0.000873566C0.000873566 7.62362 -0.378025 0.309854 14.6567 0.0203509Z" fill="#1D1D1B"/>
            </svg>
          </Button>
        </div>
        <div className={styles.footer__centralGroup__right}>
          <Button width={88} height={26} className={styles.footer__actionButton} aria-label="Блок 1">Бл1</Button>
          <Button width={26} height={26} className={styles.footer__closeButton} aria-label="Закрыть">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 17.5L17.5 1.5M1.5 1.5L17.5 17.5" stroke="black" stroke-width="2"/>
            </svg>
          </Button>
        </div>      
      </div>

      <div className={styles.footer__rightPanel}>
        <div className={styles.footer__toolsGroup}>
          <Button width={88} height={28} className={styles.footer__toolButton} aria-label="Инструмент 1">
            <svg width="16" height="16" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 18C13.9183 18 17.5 14.4183 17.5 10C17.5 5.58175 13.9183 2.00003 9.5 2.00003C5.08172 2.00003 1.5 5.58175 1.5 10C1.5 14.4183 5.08172 18 9.5 18ZM9.5 19C14.4706 19 18.5 14.9706 18.5 10C18.5 5.02947 14.4706 1.00003 9.5 1.00003C4.52944 1.00003 0.5 5.02947 0.5 10C0.5 14.9706 4.52944 19 9.5 19Z" fill="black"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8536 4.35358L3.85355 16.3536L3.14645 15.6465L15.1464 3.64648L15.8536 4.35358Z" fill="black"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1464 16.3536L3.14645 4.35358L3.85355 3.64648L15.8536 15.6465L15.1464 16.3536Z" fill="black"/>
              <path d="M15.8536 4.35358L16.2071 4.70714L16.5607 4.35358L16.2071 4.00003L15.8536 4.35358ZM3.85355 16.3536L3.5 16.7071L3.85355 17.0607L4.20711 16.7071L3.85355 16.3536ZM3.14645 15.6465L2.79289 15.2929L2.43934 15.6465L2.79289 16L3.14645 15.6465ZM15.1464 3.64648L15.5 3.29292L15.1464 2.93937L14.7929 3.29292L15.1464 3.64648ZM15.1464 16.3536L14.7929 16.7071L15.1464 17.0607L15.5 16.7071L15.1464 16.3536ZM3.14645 4.35358L2.79289 4.00003L2.43934 4.35358L2.79289 4.70714L3.14645 4.35358ZM3.85355 3.64648L4.20711 3.29292L3.85355 2.93937L3.5 3.29292L3.85355 3.64648ZM15.8536 15.6465L16.2071 16L16.5607 15.6465L16.2071 15.2929L15.8536 15.6465ZM9.5 18.5C14.1944 18.5 18 14.6945 18 10H17C17 14.1422 13.6421 17.5 9.5 17.5V18.5ZM18 10C18 5.30561 14.1944 1.50003 9.5 1.50003V2.50003C13.6421 2.50003 17 5.85789 17 10H18ZM9.5 1.50003C4.80558 1.50003 1 5.30561 1 10H2C2 5.85789 5.35786 2.50003 9.5 2.50003V1.50003ZM1 10C1 14.6945 4.80558 18.5 9.5 18.5V17.5C5.35786 17.5 2 14.1422 2 10H1ZM9.5 19.5C14.7467 19.5 19 15.2467 19 10H18C18 14.6945 14.1944 18.5 9.5 18.5V19.5ZM19 10C19 4.75333 14.7467 0.500031 9.5 0.500031V1.50003C14.1944 1.50003 18 5.30561 18 10H19ZM9.5 0.500031C4.25329 0.500031 0 4.75333 0 10H1C1 5.30561 4.80558 1.50003 9.5 1.50003V0.500031ZM0 10C0 15.2467 4.25329 19.5 9.5 19.5V18.5C4.80558 18.5 1 14.6945 1 10H0ZM15.5 4.00003L3.5 16L4.20711 16.7071L16.2071 4.70714L15.5 4.00003ZM4.20711 16L3.5 15.2929L2.79289 16L3.5 16.7071L4.20711 16ZM3.5 16L15.5 4.00003L14.7929 3.29292L2.79289 15.2929L3.5 16ZM14.7929 4.00003L15.5 4.70714L16.2071 4.00003L15.5 3.29292L14.7929 4.00003ZM15.5 16L3.5 4.00003L2.79289 4.70714L14.7929 16.7071L15.5 16ZM3.5 4.70714L4.20711 4.00003L3.5 3.29292L2.79289 4.00003L3.5 4.70714ZM3.5 4.00003L15.5 16L16.2071 15.2929L4.20711 3.29292L3.5 4.00003ZM15.5 15.2929L14.7929 16L15.5 16.7071L16.2071 16L15.5 15.2929Z" fill="black"/>
            </svg>
          </Button>
          <Button width={88} height={28} className={styles.footer__toolButton} aria-label="Инструмент 2">
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.25 2.85606V17.144L4.24044 13.5699L3.95603 13.3163H3.57502H1.5V6.68372H3.57502H3.95603L4.24044 6.4302L8.25 2.85606Z" stroke="#231F20" stroke-width="2" stroke-miterlimit="10"/>
              <path d="M10.5 13.125C12.1667 11.3988 12.1667 8.60131 10.5 6.87503" stroke="#231F20" stroke-width="2" stroke-miterlimit="10"/>
              <path d="M13 15.625C16.3333 12.5176 16.3333 7.48245 13 4.37503" stroke="#231F20" stroke-width="2" stroke-miterlimit="10"/>
              <path d="M15.5 19.375C20.5 14.191 20.5 5.80903 15.5 0.625031" stroke="#231F20" stroke-width="2" stroke-miterlimit="10"/>
            </svg>
          </Button>
        </div>
        <div className={styles.footer__warning__wrapper}>
          <p className={styles.footer__warning__text}>Предупредительная</p>
        </div>
      </div>

      <div className={styles.footer__operatorPanel}>
        <Button 
          width={44} 
          height={44} 
          className={styles.footer__largeButton}
          image="/images/operator.webp"
          onClick={() => console.log('Кнопка оператор работает!')} 
          style={{ padding: '0px' }} 
        />
        <div className={styles.footer__operator__wrapper}>
           <span className={styles.footer__operator}>Оператор:</span>
           <span className={styles.footer__operatorName}>ASUTP_SMENA_V</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
