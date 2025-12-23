import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { RootState } from '@/store/store';
import { tickTimer } from '@/store/timerSlice';

export const useTimer = () => {
     const dispatch = useAppDispatch();
     const { isRunning, seconds } = useAppSelector((state: RootState) => state.timer);

     const hh: number = Math.floor(seconds / 3600);
     const mm: number = Math.floor((seconds % 3600) / 60);
     const ss: number = seconds % 60;

     const intervalRef = useRef<NodeJS.Timeout | null>(null);

     useEffect(() => {
          if (isRunning) {
               if (!intervalRef.current) {
                    intervalRef.current = setInterval(() => {
                         dispatch(tickTimer());
                    }, 1000);
               }
          } else {
               if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
               }
          };

          return () => {
               if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
               }
          };
     }, [isRunning, dispatch]);

     return { hh, mm, ss };
};