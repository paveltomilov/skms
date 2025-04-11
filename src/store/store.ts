// src/store/store.ts

// Импортируем основную функцию для создания стора из Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
// Импортируем стандартные хуки из react-redux, которые мы будем типизировать
import { useDispatch, useSelector, useStore } from 'react-redux';
// TypedUseSelectorHook больше не нужен при использовании синтаксиса .withTypes()

// --- Импорт редьюсеров из всех твоих файлов слайсов ---
// Важно: Убедись, что пути к файлам слайсов указаны правильно относительно этого файла!
// Если слайсы лежат в подпапке 'slices', пути будут примерно такими:
import buttonsReducer from './buttonsSlice'; // Путь к слайсу кнопок
import gateReducer from './gateSlice';       // Путь к слайсу Gate
import sidebarReducer from './sidebarSlice';   // Путь к слайсу Sidebar
import popupReducer from './popupSlice';     // Путь к слайсу Popup
// Добавляем импорт нашего нового редьюсера мультиметра
import multimeterReducer from './multimeterSlice'; // Путь к слайсу мультиметра

// ------------------------------------------------------


const rootReducer = {
  buttonsReducer: buttonsReducer, 
  gateReducer: gateReducer,
  sidebar: sidebarReducer,     
  popup: popupReducer,
  multimeter: multimeterReducer, 
};

/**
 * @returns Экземпляр сконфигурированного Redux стора.
 */
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};


export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;


export type AppDispatch = AppStore['dispatch'];


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();


export const useAppSelector = useSelector.withTypes<RootState>();

export const useAppStore = useStore.withTypes<AppStore>();


export const store = makeStore;

