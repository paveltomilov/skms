import { createSlice } from '@reduxjs/toolkit';
// Описание неисправности
export interface Malfunction {
	id: string;
	name: string;
	active: boolean;
}

// Базовый элемент схемы
export interface BaseElement {
	id: string;
	name: string;
	resistance: number;
	voltagePresent: number;
	groundContact: boolean;
	wireContact: boolean;
	malfunctions: Malfunction[];
}

// Элемент с возможными ветвями (дочерними узлами)
export interface ElementWithBranches {
	branches: (CircuitElement | CircuitElement[])[];
}

// Элемент схемы может быть либо обычным элементом, либо с ветвями
export type CircuitElement = BaseElement | ElementWithBranches;

// Состояние всей схемы
export interface InitialState {
	powerCircuit: CircuitElement[];
	controlCircuit: CircuitElement[];
}
export const initialState: InitialState = {
	powerCircuit: [
		{
			id: 'powerCircuit.1',
			name: 'Вводной автомат',
			resistance: 0,
			voltagePresent: 220,
			groundContact: false,
			wireContact: false,
			malfunctions: [
				{
					id: 'powerCircuit.1.1',
					name: 'Плохой контакт на клемме, нет одной фазы',
					active: false,
				},
				{
					id: 'powerCircuit.1.2',
					name: 'Ложно выбивает',
					active: false,
				},
				{
					id: 'powerCircuit.1.3',
					name: 'Собирается механически, но нет коммутации',
					active: false,
				},
			],
		},
		{
			branches: [
				{
					id: 'powerCircuit.2.1',
					name: 'Фаза A',
					resistance: 0,
					voltagePresent: 220,
					groundContact: false,
					wireContact: false,
					malfunctions: [
						{
							id: 'powerCircuit.2.1.1',
							name: 'Короткое замыкание с фазой C',
							active: false,
						},
						{
							id: 'powerCircuit.2.1.2',
							name: 'Короткое замыкание с фазой B',
							active: false,
						},
						{
							id: 'powerCircuit.2.1.3',
							name: 'Обрыв',
							active: false,
						},
						{
							id: 'powerCircuit.2.1.4',
							name: 'Короткое замыкание на землю',
							active: false,
						},
					],
				},
				{
					id: 'powerCircuit.2.2',
					name: 'Фаза B',
					resistance: 0,
					voltagePresent: 220,
					groundContact: false,
					wireContact: false,
					malfunctions: [
						{
							id: 'powerCircuit.2.2.1',
							name: 'Короткое замыкание с фазой C',
							active: false,
						},
						{
							id: 'powerCircuit.2.2.2',
							name: 'Короткое замыкание с фазой A',
							active: false,
						},
						{
							id: 'powerCircuit.2.2.3',
							name: 'Обрыв',
							active: false,
						},
						{
							id: 'powerCircuit.2.2.4',
							name: 'Короткое замыкание на землю',
							active: false,
						},
					],
				},
				{
					id: 'powerCircuit.2.3',
					name: 'Фаза C',
					resistance: 0,
					voltagePresent: 220,
					groundContact: false,
					wireContact: false,
					malfunctions: [
						{
							id: 'powerCircuit.2.3.1',
							name: 'Короткое замыкание с фазой A',
							active: false,
						},
						{
							id: 'powerCircuit.2.3.2',
							name: 'Короткое замыкание с фазой B',
							active: false,
						},
						{
							id: 'powerCircuit.2.3.3',
							name: 'Обрыв',
							active: false,
						},
						{
							id: 'powerCircuit.2.3.4',
							name: 'Короткое замыкание на землю',
							active: false,
						},
					],
				},
			],
		},
		{
			branches: [
				{
					id: 'powerCircuit.3.1',
					name: 'Пускатель открыть',
					resistance: 0,
					voltagePresent: 0,
					groundContact: false,
					wireContact: false,
					malfunctions: [
						{
							id: 'powerCircuit.3.1.1',
							name: 'Неисправна катушка, пускатель не подтягивается',
							active: false,
						},
						{
							id: 'powerCircuit.3.1.2',
							name: 'Нет контакта в контактной группе',
							active: false,
						},
						{
							id: 'powerCircuit.3.1.3',
							name: 'Залипший контакт в контактной группе',
							active: false,
						},
					],
				},
				{
					id: 'powerCircuit.3.2',
					name: 'Пускатель закрыть',
					resistance: 0,
					voltagePresent: 0,
					groundContact: false,
					wireContact: false,
					malfunctions: [
						{
							id: 'powerCircuit.3.2.1',
							name: 'Неисправна катушка, пускатель не подтягивается',
							active: false,
						},
						{
							id: 'powerCircuit.3.2.2',
							name: 'Нет контакта в контактной группе',
							active: false,
						},
						{
							id: 'powerCircuit.3.2.3',
							name: 'Залипший контакт в контактной группе',
							active: false,
						},
					],
				},
			],
		},
		{
			branches: [
				{
					id: 'powerCircuit.4.1',
					name: 'Фаза A',
					resistance: 0,
					voltagePresent: 220,
					groundContact: false,
					wireContact: false,
					malfunctions: [
						{
							id: 'powerCircuit.4.1.1',
							name: 'Короткое замыкание с фазой C',
							active: false,
						},
						{
							id: 'powerCircuit.4.1.2',
							name: 'Короткое замыкание с фазой B',
							active: false,
						},
						{
							id: 'powerCircuit.4.1.3',
							name: 'Обрыв',
							active: false,
						},
						{
							id: 'powerCircuit.4.1.4',
							name: 'Короткое замыкание на землю',
							active: false,
						},
					],
				},
				{
					id: 'powerCircuit.4.2',
					name: 'Фаза B',
					resistance: 0,
					voltagePresent: 220,
					groundContact: false,
					wireContact: false,
					malfunctions: [
						{
							id: 'powerCircuit.4.2.1',
							name: 'Короткое замыкание с фазой C',
							active: false,
						},
						{
							id: 'powerCircuit.4.2.2',
							name: 'Короткое замыкание с фазой A',
							active: false,
						},
						{
							id: 'powerCircuit.4.2.3',
							name: 'Обрыв',
							active: false,
						},
						{
							id: 'powerCircuit.4.2.4',
							name: 'Короткое замыкание на землю',
							active: false,
						},
					],
				},
				{
					id: 'powerCircuit.4.3',
					name: 'Фаза C',
					resistance: 0,
					voltagePresent: 220,
					groundContact: false,
					wireContact: false,
					malfunctions: [
						{
							id: 'powerCircuit.4.3.1',
							name: 'Короткое замыкание с фазой A',
							active: false,
						},
						{
							id: 'powerCircuit.4.3.2',
							name: 'Короткое замыкание с фазой B',
							active: false,
						},
						{
							id: 'powerCircuit.4.3.3',
							name: 'Обрыв',
							active: false,
						},
						{
							id: 'powerCircuit.4.3.4',
							name: 'Короткое замыкание на землю',
							active: false,
						},
					],
				},
			],
		},
		{
			id: 'powerCircuit.5',
			name: 'Электродвигатель задвижки',
			resistance: 0,
			voltagePresent: 0,
			groundContact: false,
			wireContact: false,
			malfunctions: [
				{ id: 'powerCircuit.5.1', name: 'Обрыв фазы', active: false },
				{
					id: 'powerCircuit.5.2',
					name: 'Короткое замыкание между фазами',
					active: false,
				},
				{
					id: 'powerCircuit.5.3',
					name: 'Короткое замыкание обмотки на землю',
					active: false,
				},
			],
		},
	],
	controlCircuit: [
		{
			id: 'controlCircuit.1',
			name: 'Автомат питания цепей управления',
			resistance: 0,
			voltagePresent: 0,
			groundContact: false,
			wireContact: false,
			malfunctions: [
				{
					id: 'controlCircuit.1.1',
					name: 'Плохой контакт на клемме, нет фазы',
					active: false,
				},
				{
					id: 'controlCircuit.1.2',
					name: 'Ложно выбивает',
					active: false,
				},
				{
					id: 'controlCircuit.1.3',
					name: 'Собирается механически, но нет коммутации',
					active: false,
				},
			],
		},
		{
			id: 'controlCircuit.2',
			name: 'Фаза А',
			resistance: 0,
			voltagePresent: 0,
			groundContact: false,
			wireContact: false,
			malfunctions: [
				{
					id: 'controlCircuit.2.1',
					name: 'Обрыв провода',
					active: false,
				},
				{
					id: 'controlCircuit.2.2',
					name: 'Короткое замыкание на землю',
					active: false,
				},
				{
					id: 'controlCircuit.2.3',
					name: 'Короткое замыкание с проводом от фазы на концевой выключатель закрыто',
					active: false,
				},
				{
					id: 'controlCircuit.2.4',
					name: 'Короткое замыкание с проводом фазы двигателя',
					active: false,
				},
			],
		},
		{
			branches: [
				[
					//ветка открыть
					{
						id: 'controlCircuit.3.1.1',
						name: 'Концевой выключатель открыто',
						resistance: 0,
						voltagePresent: 0,
						groundContact: false,
						wireContact: false,
						malfunctions: [
							{
								id: 'controlCircuit.3.1.1.1',
								name: 'Залипший контакт',
								active: false,
							},
							{
								id: 'controlCircuit.3.1.1.2',
								name: 'Нет контакта',
								active: false,
							},
							{
								id: 'controlCircuit.3.1.1.3',
								name: 'Не настроен',
								active: false,
							},
						],
					},
					{
						id: 'controlCircuit.3.1.2',
						name: 'Провод концевого выключателя открыто до клемника КРУЗА-П',
						resistance: 0,
						voltagePresent: 0,
						groundContact: false,
						wireContact: false,
						malfunctions: [
							{
								id: 'controlCircuit.3.1.2.1',
								name: 'Обрыв провода',
								active: false,
							},
							{
								id: 'controlCircuit.3.1.2.2',
								name: 'Короткое замыкание на землю',
								active: false,
							},
							{
								id: 'controlCircuit.3.1.2.3',
								name: 'Короткое замыкание с проводом концевого выключателя закрыто до клемника КРУЗА-П',
								active: false,
							},
							{
								id: 'controlCircuit.3.1.2.4',
								name: 'Короткое замыкание с проводом фазы двигателя',
								active: false,
							},
						],
					},
					{
						branches: [
							{
								id: 'controlCircuit.3.1.3.1',
								name: 'Вставка NDI (сигнал «не открыто»)',
								resistance: 0,
								voltagePresent: 0,
								groundContact: false,
								wireContact: false,
								malfunctions: [
									{
										id: 'controlCircuit.3.1.3.1.1',
										name: 'Нет контакта, сигнал не проходит',
										active: false,
									},
									{
										id: 'controlCircuit.3.1.3.1.2',
										name: 'Ложно сработанная, сигнал не снимается',
										active: false,
									},
								],
							},
							[
								{
									branches: [
										{
											id: 'controlCircuit.3.1.3.2.1.1',
											name: 'Вставка NDI (команда открыть с ПТК)',
											resistance: 0,
											voltagePresent: 0,
											groundContact: false,
											wireContact: false,
											malfunctions: [
												{
													id: 'controlCircuit.3.1.3.2.1.1.1',
													name: 'Нет контакта, команда не уходит',
													active: false,
												},
												{
													id: 'controlCircuit.3.1.3.2.1.1.2',
													name: 'Ложно сработанная, команда постоянно висит',
													active: false,
												},
											],
										},
										{
											id: 'controlCircuit.3.1.3.2.1.2',
											name: 'Кнопка КРУЗА-П (команда открыть с КРУЗА-П)',
											resistance: 0,
											voltagePresent: 0,
											groundContact: false,
											wireContact: false,
											malfunctions: [
												{
													id: 'controlCircuit.3.1.3.2.1.2.1',
													name: 'Нет контакта, команда не уходит',
													active: false,
												},
												{
													id: 'controlCircuit.3.1.3.2.1.2.2',
													name: 'Ложно сработанная, команда постоянно висит',
													active: false,
												},
											],
										},
									],
								},
								{
									id: 'controlCircuit.3.1.3.2.2',
									name: 'Блокировка включения пускателя на открыте',
									resistance: 0,
									voltagePresent: 0,
									groundContact: false,
									wireContact: false,
									malfunctions: [
										{
											id: 'controlCircuit.3.1.3.2.2.1',
											name: 'Нет контакта',
											active: false,
										},
										{
											id: 'controlCircuit.3.1.3.2.2.2',
											name: 'Ложно сработанный контакт',
											active: false,
										},
									],
								},
								{
									id: 'controlCircuit.3.1.3.2.3',
									name: 'Катушка пускателя открыть',
									resistance: 0,
									voltagePresent: 0,
									groundContact: false,
									wireContact: false,
									malfunctions: [
										{
											id: 'controlCircuit.3.1.3.2.3.1',
											name: 'Неисправна катушка, пускатель не подтягивается',
											active: false,
										},
									],
								},
							],
							{
								id: 'controlCircuit.3.1.3.3',
								name: 'Лампа в КРУЗА-П закрыто',
								resistance: 0,
								voltagePresent: 0,
								groundContact: false,
								wireContact: false,
								malfunctions: [
									{
										id: 'controlCircuit.3.1.3.3.1',
										name: 'Перегорела',
										active: false,
									},
								],
							},
						],
					},
				],
				[
					//ветка закрыть
					{
						id: 'controlCircuit.3.2.1',
						name: 'Концевой выключатель закрыто',
						resistance: 0,
						voltagePresent: 0,
						groundContact: false,
						wireContact: false,
						malfunctions: [
							{
								id: 'controlCircuit.3.2.1.1',
								name: 'Залипший контакт',
								active: false,
							},
							{
								id: 'controlCircuit.3.2.1.2',
								name: 'Нет контакта',
								active: false,
							},
							{
								id: 'controlCircuit.3.2.1.3',
								name: 'Не настроен',
								active: false,
							},
						],
					},
					{
						id: 'controlCircuit.3.2.2',
						name: 'Провод концевого выключателя закрыто до клемника КРУЗА-П',
						resistance: 0,
						voltagePresent: 0,
						groundContact: false,
						wireContact: false,
						malfunctions: [
							{
								id: 'controlCircuit.3.2.2.1',
								name: 'Обрыв провода',
								active: false,
							},
							{
								id: 'controlCircuit.3.2.2.2',
								name: 'Короткое замыкание на землю',
								active: false,
							},
							{
								id: 'controlCircuit.3.2.2.3',
								name: 'Короткое замыкание с проводом концевого выключателя закрыто до клемника КРУЗА-П',
								active: false,
							},
							{
								id: 'controlCircuit.3.2.2.4',
								name: 'Короткое замыкание с проводом фазы двигателя',
								active: false,
							},
						],
					},
					{
						branches: [
							{
								id: 'controlCircuit.3.2.3.1',
								name: 'Вставка NDI (сигнал «не закрыто»)',
								resistance: 0,
								voltagePresent: 0,
								groundContact: false,
								wireContact: false,
								malfunctions: [
									{
										id: 'controlCircuit.3.2.3.1.1',
										name: 'Нет контакта, сигнал не проходит',
										active: false,
									},
									{
										id: 'controlCircuit.3.2.3.1.2',
										name: 'Ложно сработанная, сигнал не снимается',
										active: false,
									},
								],
							},
							[
								{
									branches: [
										{
											id: 'controlCircuit.3.2.3.2.1.1',
											name: 'Вставка NDI (команда закрыть с ПТК)',
											resistance: 0,
											voltagePresent: 0,
											groundContact: false,
											wireContact: false,
											malfunctions: [
												{
													id: 'controlCircuit.3.2.3.2.1.1.1',
													name: 'Нет контакта, команда не уходит',
													active: false,
												},
												{
													id: 'controlCircuit.3.2.3.2.1.1.2',
													name: 'Ложно сработанная, команда постоянно висит',
													active: false,
												},
											],
										},
										{
											id: 'controlCircuit.3.2.3.2.1.2',
											name: 'Кнопка КРУЗА-П (команда закрыть с КРУЗА-П)',
											resistance: 0,
											voltagePresent: 0,
											groundContact: false,
											wireContact: false,
											malfunctions: [
												{
													id: 'controlCircuit.3.2.3.2.1.2.1',
													name: 'Нет контакта, команда не уходит',
													active: false,
												},
												{
													id: 'controlCircuit.3.2.3.2.1.2.2',
													name: 'Ложно сработанная, команда постоянно висит',
													active: false,
												},
											],
										},
									],
								},
								{
									id: 'controlCircuit.3.2.3.2.2',
									name: 'Блокировка включения пускателя на закрыть',
									resistance: 0,
									voltagePresent: 0,
									groundContact: false,
									wireContact: false,
									malfunctions: [
										{
											id: 'controlCircuit.3.2.3.2.2.1',
											name: 'Нет контакта',
											active: false,
										},
										{
											id: 'controlCircuit.3.2.3.2.2.2',
											name: 'Ложно сработанный контакт',
											active: false,
										},
									],
								},
								{
									id: 'controlCircuit.3.2.3.2.3',
									name: 'Катушка пускателя закрыть',
									resistance: 0,
									voltagePresent: 0,
									groundContact: false,
									wireContact: false,
									malfunctions: [
										{
											id: 'controlCircuit.3.2.3.2.3.1',
											name: 'Неисправна катушка, пускатель не подтягивается',
											active: false,
										},
									],
								},
							],
							{
								id: 'controlCircuit.3.2.3.3',
								name: 'Лампа в КРУЗА-П открыто',
								resistance: 0,
								voltagePresent: 0,
								groundContact: false,
								wireContact: false,
								malfunctions: [
									{
										id: 'controlCircuit.3.2.3.3.1',
										name: 'Перегорела',
										active: false,
									},
								],
							},
						],
					},
				],
			],
		},
		{
			id: 'controlCircuit.4',
			name: 'Нейтраль',
			resistance: 0,
			voltagePresent: 0,
			groundContact: false,
			wireContact: false,
			malfunctions: [
				{
					id: 'controlCircuit.4.1',
					name: 'обрыв',
					active: false,
				},
			],
		},
	],
};

const faultsSlice = createSlice({
	name: 'faults',
	initialState,
	reducers: {
		// Активация неисправности
		activateFault() {},
		// Деактивация неисправности
		deactivateFault() {},

		// Изменение сопротивления
		setResistance() {},

		// Изменение напряжения
		setVoltagePresent() {},

		// Изменение контакта с землёй
		setGroundContact() {},

		// Изменение контакта с проводом
		setWireContact() {},
	},
});

// Экспорт экшенов
export const {
	activateFault,
	deactivateFault,
	setResistance,
	setVoltagePresent,
	setGroundContact,
	setWireContact,
} = faultsSlice.actions;

// Экспорт редьюсера
export default faultsSlice.reducer;
