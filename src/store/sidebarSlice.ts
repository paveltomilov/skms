import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Тип для состояния бокового меню
interface SidebarState {
  isOpen: boolean;
}

// Начальное состояние
const initialState: SidebarState = {
  isOpen: false,
};

// Создание slice
const sidebarSlice = createSlice({
  name: 'sidebar', // Имя slice
  initialState,    // Начальное состояние
  reducers: {
    // Action для открытия/закрытия меню
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    // Action для явного открытия меню
    openSidebar: (state) => {
      state.isOpen = true;
    },
    // Action для явного закрытия меню
    closeSidebar: (state) => {
      state.isOpen = false;
    },
    // Action для установки состояния меню (например, из localStorage)
    setSidebarState: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

// Экспорт actions
export const { toggleSidebar, openSidebar, closeSidebar, setSidebarState } = sidebarSlice.actions;

// Экспорт reducer
export default sidebarSlice.reducer;