import style from './GateWindow.module.scss';
import { Gate } from '@/components/Gate/Gate';
import { useAppSelector } from '@/store/hooks';
import { FC } from 'react';

export const GateWindow: FC = () => {
  const gateState = useAppSelector((state) => state.gateReducer);

  return (
    <>
      <div className={style.window}>
        <Gate gateState={gateState.state} />
        <div className={style.indication}>
          <span className={style.value}>{gateState.value}</span>
          <span className={style.measurements}>м3/ч</span>
        </div>
      </div>
    </>
  );
};
