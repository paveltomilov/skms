
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import type { RootState, AppDispatch } from './store';

/**
 * @returns {AppDispatch} 
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * @type {TypedUseSelectorHook<RootState>}
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;