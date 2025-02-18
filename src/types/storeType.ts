// Интерфейс состояния
export interface FilterState {
  country: string[];
  region: string[];
}

export interface MainState {
  filter: FilterState;
}
