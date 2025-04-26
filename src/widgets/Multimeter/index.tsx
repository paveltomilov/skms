'use client';
import styles from './Multimeter.module.scss';
import { Display } from '@/entities/Display/Display';
import ControlPanel from '@/entities/ControlPanel/ControlPanel';
import { useAppSelector } from '@/shared/hooks/store';
import ProbeHolder from '@/shared/UI/icons/ProbeHolder';

interface MultimeterProps {
  className?: string; 
}

export const Multimeter: React.FC<MultimeterProps> = ({ className = '' }) => {
  const multimeterState = useAppSelector(state => state.multimeter);
  
  return (
    <div className={`${styles.multimeter} ${className}`}> 
      <Display value={multimeterState.displayValue} />
      <ControlPanel mode={multimeterState.currentMode} />
      <ProbeHolder
        className={`${styles.multimeter__probeHolder} ${styles.multimeter__probeHolder_black}`}
      />
      <ProbeHolder
        className={`${styles.multimeter__probeHolder} ${styles.multimeter__probeHolder_red}`}
      />
    </div>
  );
};

export default Multimeter;