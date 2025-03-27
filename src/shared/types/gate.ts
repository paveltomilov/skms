// перечисление состояний задвижки
export enum GATE_STATE_TYPE {
	close = 'close',
	toClose = 'toClose',
	open = 'open',
	toOpen = 'toOpen',
	noPower = 'noPower',
	intermediate = 'intermediate',

	// поменять название когда станет известно состояние(придумано для UI kit)
	magenta = 'magenta',
}

// типы для возможных цветов задвижки
export type Color = 'green' | 'grey' | 'black_white' | 'magenta_white';
