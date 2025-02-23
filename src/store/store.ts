import { configureStore } from '@reduxjs/toolkit';
import reducerFilter from './mainSlice';
import buttonsReducer from '../components/Button/buttonsSlice';

export const store = configureStore({
  reducer: {
    main: reducerFilter, // Исправлено название (reduser → reducer)
    buttons: buttonsReducer
  }
});

// Обновляем типы
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
