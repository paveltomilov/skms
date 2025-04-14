'use client';

import React, { useState, useCallback } from 'react';
import styles from './Multimeter.module.scss';

import { Display } from '@/entities/Display/Display';
import { Dial } from '@/entities/Dial/Dial';
import { InputJacks } from '@/entities/InputJacks/InputJacks';

import type { MultimeterMode, ModeAnglesMap } from '@/shared/types/multimeter';

const modeAngles: ModeAnglesMap = {
  OFF: 0, ACV_750: 19, ACV_200: 35, DCA_200u: 53, DCA_2000u: 71,
  DCA_20m: 90, DCA_200m: 108, DCA_10A: 127, HFE: 144, DIODE: 162,
  OHM_200: 180, OHM_2000: 199, OHM_20k: 217, OHM_200k: 235, OHM_2000k: 253,
  DCV_200m: 271, DCV_2000m: 287, DCV_20: 305, DCV_200: 323, DCV_1000: 339,
};
const dialCenterX = 99;
const dialCenterY = 157;
const labelRadius = 80;
const indicatorDotRadius = 68;
const dialWrapperCssHeight = 106;
const getCoords = (angle: number, radius: number): { x: number; y: number } => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: dialCenterX + radius * Math.cos(rad), y: dialCenterY + radius * Math.sin(rad) };
};
const labelPositions: Record<string, { angle: number, text: string, small?: boolean }> = {
  OFF: { angle: modeAngles.OFF, text: 'OFF' }, ACV_750: { angle: modeAngles.ACV_750, text: '750' },
  ACV_200: { angle: modeAngles.ACV_200, text: '200' }, DCA_200u: { angle: modeAngles.DCA_200u, text: '200µ'},
  DCA_2000u:{ angle: modeAngles.DCA_2000u,text: '2000µ'}, DCA_20m: { angle: modeAngles.DCA_20m, text: '20m'},
  DCA_200m: { angle: modeAngles.DCA_200m, text: '200m'}, DCA_10A: { angle: modeAngles.DCA_10A, text: '10A' },
  HFE: { angle: modeAngles.HFE, text: 'hFE', small: true }, DIODE: { angle: modeAngles.DIODE, text: '→+', small: true },
  OHM_200: { angle: modeAngles.OHM_200, text: '200', small: true }, OHM_2000: { angle: modeAngles.OHM_2000, text: '2000' },
  OHM_20k: { angle: modeAngles.OHM_20k, text: '20k' }, OHM_200k: { angle: modeAngles.OHM_200k, text: '200k' },
  OHM_2000k:{ angle: modeAngles.OHM_2000k,text: '2k' }, DCV_200m: { angle: modeAngles.DCV_200m, text: '200m' },
  DCV_2000m:{ angle: modeAngles.DCV_2000m,text: '2v' }, DCV_20: { angle: modeAngles.DCV_20, text: '20' },
  DCV_200: { angle: modeAngles.DCV_200, text: '200' }, DCV_1000: { angle: modeAngles.DCV_1000, text: '1000' },
};
const Multimeter: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<MultimeterMode>('OFF');
  const [displayValue, setDisplayValue] = useState<string | number>('');

  const handleModeSelected = useCallback((mode: MultimeterMode) => {
    setCurrentMode(mode);
    if (mode === 'OFF') { setDisplayValue(''); }
    else if (mode.startsWith('DCV_') || mode.startsWith('ACV_') || mode.startsWith('DCA_') || mode === 'HFE') { setDisplayValue('0.00'); }
    else if (mode.startsWith('OHM_') || mode === 'DIODE') { setDisplayValue('OL'); }
    else { setDisplayValue('---'); }
  }, []);

  const dialWrapperTopOffset = dialCenterY - (dialWrapperCssHeight / 2);

  const spritePath = '/svg/multimeter-sprite.svg'; 

  return (
    <div className={styles.multimeterContainer}>
      <svg
        viewBox="0 0 200 300" 
        className={styles.multimeterSvgBase}
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="multimeterTitle"
      >
          <title id="multimeterTitle">Виртуальный мультиметр (UI)</title>
          <use id="displayArea" href={`${spritePath}#multimeter-display-area`}/>
          <use href={`${spritePath}#multimeter-bg-lines`} />         
          <use id="sectionHeaders" href={`${spritePath}#multimeter-section-headers`}/>
         <g className={styles.scaleLabels}>
             {Object.entries(labelPositions).map(([key, { angle, text, small }]) => {
                 const textPos = getCoords(angle, labelRadius);
                 const dotPos = getCoords(angle, indicatorDotRadius);
                 return (
                     <g key={`label-${key}`} className={styles.labelGroup}>
                         <circle cx={dotPos.x} cy={dotPos.y} r="2" className={styles.indicatorDot} filter="url(#indicatorDotGlow)" />
                         <text x={textPos.x} y={textPos.y} className={`${styles.rangeLabel} ${small ? styles.smallLabel : ''}`} >{text}</text>
                     </g>
                 );
             })}
         </g>
      </svg> 
      <div className={styles.displayWrapper}>
        <Display value={displayValue} />
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

export default Multimeter;