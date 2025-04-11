import React from 'react';
import styles from './Multimeter.module.scss';

// Импорты дочерних компонентов
import { Display } from './ui/Display/Display';
import { Dial } from './ui/Dial/Dial';
import { InputJacks } from './ui/InputJacks/InputJacks';

// Импорты из Redux и типов
import {
  selectCurrentMode,
  selectActualDisplay,
  setCurrentMode,
} from '@/store/multimeterSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { MultimeterMode, ModeAnglesMap } from '@/shared/types/multimeter.d';

// --- Конфигурации ---

// 1. Углы режимов (можно точнее настроить)
const modeAngles: ModeAnglesMap = {
    OFF:       0,    ACV_750:   19, ACV_200:   35, DCA_200u:  53, DCA_2000u: 71,
    DCA_20m:   90, DCA_200m:  108, DCA_10A:   127, HFE:       144, DIODE:     162,
    OHM_200:   180, OHM_2000:  199, OHM_20k:   217, OHM_200k:  235, OHM_2000k: 253,
    DCV_200m:  271, DCV_2000m: 287, DCV_20:    305, DCV_200:   323, DCV_1000:  339,
};

// 2. Геометрия SVG (viewBox="0 0 200 300")
const dialCenterX = 103;
const dialCenterY = 160; // Центр ручки (возвращено значение)
const labelRadius = 80;         // Радиус для текста меток диапазонов
const indicatorDotRadius = 68;  // Радиус для точек
const dialWrapperCssHeight = 110; // Высота HTML-обертки ручки (из SCSS)

// 3. Функция getCoords (использует dialCenterY = 160) - исправлено
const getCoords = (angle: number, radius: number): { x: number; y: number } => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: dialCenterX + radius * Math.cos(rad),
      y: dialCenterY + radius * Math.sin(rad), // ИСПОЛЬЗУЕМ ОБНОВЛЕННЫЙ dialCenterY
    };
};

// 4. Позиции меток диапазонов (координаты рассчитываются через getCoords)
const labelPositions: Record<string, { angle: number, text: string, small?: boolean }> = {
    OFF:      { angle: modeAngles.OFF,   text: 'OFF' }, ACV_750:  { angle: modeAngles.ACV_750,  text: '750' },
    ACV_200:  { angle: modeAngles.ACV_200,  text: '200' }, DCA_200u: { angle: modeAngles.DCA_200u, text: '200µ'},
    DCA_2000u:{ angle: modeAngles.DCA_2000u,text: '2000µ'}, DCA_20m:  { angle: modeAngles.DCA_20m,  text: '20m'},
    DCA_200m: { angle: modeAngles.DCA_200m, text: '200m'}, DCA_10A:  { angle: modeAngles.DCA_10A,  text: '10A' },
    HFE:      { angle: modeAngles.HFE,      text: 'hFE', small: true }, DIODE:    { angle: modeAngles.DIODE,    text: '→+', small: true },
    OHM_200:  { angle: modeAngles.OHM_200,  text: '200', small: true }, OHM_2000: { angle: modeAngles.OHM_2000, text: '2000' },
    OHM_20k:  { angle: modeAngles.OHM_20k,  text: '20k' }, OHM_200k: { angle: modeAngles.OHM_200k, text: '200k' },
    OHM_2000k:{ angle: modeAngles.OHM_2000k,text: '2k' }, DCV_200m: { angle: modeAngles.DCV_200m, text: '200m' },
    DCV_2000m:{ angle: modeAngles.DCV_2000m,text: '2v' }, DCV_20:   { angle: modeAngles.DCV_20,   text: '20' },
    DCV_200:  { angle: modeAngles.DCV_200,  text: '200' }, DCV_1000: { angle: modeAngles.DCV_1000, text: '1000' },
};


// --- Компонент MultimeterWidget ---
const MultimeterWidget: React.FC = () => {
  const currentMode = useAppSelector(selectCurrentMode);
  const actualDisplayValue = useAppSelector(selectActualDisplay);
  const dispatch = useAppDispatch();

  const handleModeSelected = (mode: MultimeterMode) => {
    dispatch(setCurrentMode(mode));
  };

  const dialWrapperTopOffset = dialCenterY - (dialWrapperCssHeight / 2);

  return (
    <div className={styles.multimeterContainer}>
      <svg
        viewBox="3 2 200 300" // исходный viewBox
        className={styles.multimeterSvgBase}
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="multimeterTitle"
      >
        <title id="multimeterTitle">Виртуальный мультиметр</title>

        <defs>
          <filter id="indicatorDotGlow" x="-50%" y="-50%" width="200%" height="200%">
            {/* Увеличенная область для предотвращения обрезки свечения */}

            {/* Внешнее свечение (Пример: зеленоватое) */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="outerBlur"/> 
            <feFlood floodColor="#D9D9D9" floodOpacity="0.2" result="outerGlowColor"/> 
            <feComposite in="outerGlowColor" in2="outerBlur" operator="in" result="coloredOuterBlur"/>

        
            {/* Объединение слоев */}
            <feMerge>
              <feMergeNode in="coloredOuterBlur"/> {/* Внешнее свечение (внизу) */}
              <feMergeNode in="SourceGraphic"/>    {/* Исходная точка (сверху) */}
            </feMerge>
          </filter>
        </defs>

        {/* === Слой 2: Вставленные фоновые линии === */}
        <svg
            x="0"
            y="62"
            width="350" 
            height="200"
            viewBox="0 0 385 210"
            preserveAspectRatio="xMidYMid meet"
            className={styles.backgroundLinesContainer}
        >
            {/* ...  <path> для линий ... */}
             <path d="M123.026 171.646L127.779 190.593C129.493 197.364 124.182 197.364 116.95 197.364H109.05H68.3505C65.9626 197.364 63.868 195.83 62.8257 193.682C58.3718 184.501 47.9987 172.484 31.9319 172.484C23.7426 172.484 17.1068 172.484 12.0793 172.484C5.90374 172.484 0.902344 167.478 0.902344 161.302V127.198C0.902344 121.022 5.90861 116.016 12.0842 116.016H45.6296" stroke="#0AB700" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
            <path d="M44.791 111.543H12.0842C5.9086 111.543 0.902344 106.537 0.902344 100.361V12.3044C0.902344 6.12883 5.90861 1.12256 12.0842 1.12256H81.7796C86.8393 1.12256 91.2684 4.52005 92.5795 9.40685L99.5819 35.5066" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
            <path d="M126.418 35.5066L133.42 9.40685C134.732 4.52005 139.161 1.12256 144.22 1.12256H216.923C219.587 1.12256 220.741 4.49658 218.634 6.12815L159.404 51.9998" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
            <path d="M102.973 34.668L98.2212 14.6021C96.5272 7.44904 101.838 0.563477 109.05 0.563477H116.95C124.161 0.563477 129.472 7.44904 127.778 14.6021L123.026 34.668" stroke="#8F1313" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
            <path d="M161.361 53.9568L220.594 8.23332C222.432 6.81476 225.098 8.12467 225.098 10.4462V154.867C225.098 156.934 222.932 158.286 221.074 157.379L174.78 134.745" stroke="#0AB700" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
            <path d="M173.102 138.1L213.485 157.687C217.339 159.556 219.787 163.464 219.787 167.747V226.436 M161.082 152.916L197.576 177.821C200.629 179.904 202.455 183.361 202.455 187.057V221.125 M127.257 171.086L132.876 192.625C133.518 195.087 135.741 196.804 138.285 196.804H158.47C163.095 196.804 165.72 191.509 162.92 187.829L144.868 164.098" stroke="#8F1313" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
        </svg>

        {/* === Слой 3: Текстовые метки и точки === */}
        <g className={styles.scaleLabels}>
            {Object.entries(labelPositions).map(([key, { angle, text, small }]) => {
                const textPos = getCoords(angle, labelRadius);
                const dotPos = getCoords(angle, indicatorDotRadius);
                return (
                    <g key={`label-${key}`} className={styles.labelGroup}>
                        {/* !!!  ФИЛЬТР !!! */}
                        <circle
                            cx={dotPos.x}
                            cy={dotPos.y}
                            r="2" // Радиус точки
                            className={styles.indicatorDot} 
                            filter="url(#indicatorDotGlow)"  // Ссылка на ID фильтра
                        />
                        <text x={textPos.x} y={textPos.y} className={`${styles.rangeLabel} ${small ? styles.smallLabel : ''}`} >
                            {text}
                        </text>
                    </g>
                );
            })}
        </g>

        {/* === Слой 4: Статические заголовки режимов === */}
        <g className={styles.sectionHeaders}>
             <text x="17" y="80" className={`${styles.sectionLabel} ${styles.whiteText}`}>DCV</text>
             <text x="173" y="80" className={`${styles.sectionLabel} ${styles.whiteText}`}>ACV</text>
             <text x="187" y="101" className={`${styles.sectionLabel} ${styles.whiteText}`}>DCA</text>
        </g>

        {/* === Слой 5: Область под дисплей === */}
         {/* Используем <g> для группировки фона и его обводки */}
         <g className={styles.displayAreaGroup}> 
            {/* Основной фон дисплея (без собственной обводки) */}
            <rect
                x="0"
                y="10"
                width="205"
                height="46"
                className={styles.displayBackground} 
            />

            {/* --- Статическая внутренняя обводка дисплея --- */}
            {/* Верхняя линия */}
            <rect x="0" y="10" width="205" height="1" fill="#000000" />
            {/* Правая линия (x = 0 + 205 - 1) */}
            <rect x="204" y="10" width="1" height="46" fill="#ffffff" />
            {/* Нижняя линия (y = 10 + 46 - 1) */}
            <rect x="0" y="55" width="205" height="1" fill="#ffffff" />
            {/* Левая линия */}
            <rect x="0" y="10" width="1" height="45" fill="#000000" />
            {/* --- Конец статической обводки --- */}
          </g>
        {/* ========================================================= */}

      </svg> 

      {/* --- HTML Компоненты поверх SVG --- */}
      <div className={styles.displayWrapper}>
        <Display value={actualDisplayValue} />
      </div>
      <div
        className={styles.dialWrapper}
        style={{ top: `${dialWrapperTopOffset}px` }}
      >
        <Dial
            currentMode={currentMode}
            modeAngles={modeAngles}
            onModeSelect={handleModeSelected}
        />
      </div>
      <div className={styles.jacksWrapper}>
        <InputJacks currentMode={currentMode} />
      </div>

    </div> 
  );
};

export default MultimeterWidget;