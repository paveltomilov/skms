import { createSlice } from '@reduxjs/toolkit';
// Описание неисправности
interface Malfunction {
	id: string;
	name: string;
	active: boolean;
}

// Базовый элемент схемы
interface BaseElement {
	id: string;
	name: string;
	resistance: number;
	voltage: number;
	groundContact: boolean;
	wireContact: boolean;
	malfunctions: Malfunction[];
}

// Элемент с возможными ветвями (дочерними узлами)
interface ElementWithBranches {
	branches: (CircuitElement | CircuitElement[])[];
}

// Элемент схемы может быть либо обычным элементом, либо с ветвями
type CircuitElement = BaseElement | ElementWithBranches;

// Состояние всей схемы
interface InitialState {
	powerCircuit: CircuitElement[];
	controlCircuit: CircuitElement[];
}
const initialState: InitialState = {
	powerCircuit: [
		{
			branches: [
				[
					{
						id: 'p.1.1',
						name: 'Фаза A до вводного автомата',
						resistance: 0,
						voltage: 220,
						groundContact: false,
						wireContact: false,
						malfunctions: [
							{
								id: 'p.1.1.1',
								name: 'Короткое замыкание с фазой C',
								active: false,
							},
							{
								id: 'p.1.1.2',
								name: 'Короткое замыкание с фазой B',
								active: false,
							},
							{
								id: 'p.1.1.3',
								name: 'Обрыв',
								active: false,
							},
							{
								id: 'p.1.1.4',
								name: 'Короткое замыкание на землю',
								active: false,
							},
							{
								id: 'p.1.1.5',
								name: 'Обрыв провода',
								active: false,
							},
						],
					},
					{
						id: 'p.2',
						name: 'Контакты фазы А вводного автомата',
						resistance: 0,
						voltage: 220,
						groundContact: false,
						wireContact: false,
						malfunctions: [
							{
								id: 'p.2.1',
								name: 'Плохой контакт на клемме, нет одной фазы',
								active: false,
							},
							{
								id: 'p.2.2',
								name: 'Ложно выбивает',
								active: false,
							},
							{
								id: 'p.2.3',
								name: 'Собирается механически, но нет коммутации',
								active: false,
							},
						],
					},
					{
						id: 'p.3.1',
						name: 'Фаза A от автомата до пускателей',
						resistance: 0,
						voltage: 220,
						groundContact: false,
						wireContact: false,
						malfunctions: [
							{
								id: 'p.3.1.1',
								name: 'Короткое замыкание с фазой C',
								active: false,
							},
							{
								id: 'p.3.1.2',
								name: 'Короткое замыкание с фазой B',
								active: false,
							},
							{
								id: 'p.3.1.3',
								name: 'Обрыв',
								active: false,
							},
							{
								id: 'p.3.1.4',
								name: 'Короткое замыкание на землю',
								active: false,
							},
						],
					},
					{
						branches: [
							[
								{
									id: 'p.4.1.1',
									name: 'Пускатель открыть, контакты фазы А',
									resistance: 0,
									voltage: 0,
									groundContact: false,
									wireContact: false,
									malfunctions: [
										{
											id: 'p.4.1.1.1',
											name: 'Неисправна катушка, пускатель не подтягивается',
											active: false,
										},
										{
											id: 'p.4.1.1.2',
											name: 'Нет контакта в контактной группе',
											active: false,
										},
										{
											id: 'p.4.1.1.3',
											name: 'Залипший контакт в контактной группе',
											active: false,
										},
									],
								},
								{
									id: 'p.5.1',
									name: 'Фаза A от пускателя до двигателя',
									resistance: 0,
									voltage: 220,
									groundContact: false,
									wireContact: false,
									malfunctions: [
										{
											id: 'p.5.1.1',
											name: 'Короткое замыкание с фазой C',
											active: false,
										},
										{
											id: 'p.5.1.2',
											name: 'Короткое замыкание с фазой B',
											active: false,
										},
										{
											id: 'p.5.1.3',
											name: 'Обрыв',
											active: false,
										},
										{
											id: 'p.5.1.4',
											name: 'Короткое замыкание на землю',
											active: false,
										},
									],
								},
								{
									id: 'p.6.1',
									name: 'Электродвигатель задвижки, обмотка фазы А',
									resistance: 0,
									voltage: 0,
									groundContact: false,
									wireContact: false,
									malfunctions: [
										{
											id: 'p.6.1.1',
											name: 'Обрыв фазы',
											active: false,
										},
										{
											id: 'p.6.1.2',
											name: 'Короткое замыкание между фазами',
											active: false,
										},
										{
											id: 'p.6.1.3',
											name: 'Короткое замыкание обмотки на землю',
											active: false,
										},
									],
								},
							],
							[
								{
									id: 'p.4.2.3',
									name: 'Пускатель закрыть, контакты фазы С',
									resistance: 0,
									voltage: 0,
									groundContact: false,
									wireContact: false,
									malfunctions: [
										{
											id: 'p.4.1.3.1',
											name: 'Неисправна катушка, пускатель не подтягивается',
											active: false,
										},
										{
											id: 'p.4.1.3.2',
											name: 'Нет контакта в контактной группе',
											active: false,
										},
										{
											id: 'p.4.1.3.3',
											name: 'Залипший контакт в контактной группе',
											active: false,
										},
									],
								},
								{
									id: 'p.5.2',
									name: 'Фаза С от пускателя до двигателя',
									resistance: 0,
									voltage: 220,
									groundContact: false,
									wireContact: false,
									malfunctions: [
										{
											id: 'p.5.2.1',
											name: 'Короткое замыкание с фазой C',
											active: false,
										},
										{
											id: 'p.5.2.2',
											name: 'Короткое замыкание с фазой B',
											active: false,
										},
										{
											id: 'p.5.2.3',
											name: 'Обрыв',
											active: false,
										},
										{
											id: 'p.5.2.4',
											name: 'Короткое замыкание на землю',
											active: false,
										},
									],
								},
								{
									id: 'p.6.2',
									name: 'Электродвигатель задвижки, обмотка фазы С',
									resistance: 0,
									voltage: 0,
									groundContact: false,
									wireContact: false,
									malfunctions: [
										{
											id: 'p.6.2.1',
											name: 'Обрыв фазы',
											active: false,
										},
										{
											id: 'p.6.2.2',
											name: 'Короткое замыкание между фазами',
											active: false,
										},
										{
											id: 'p.6.2.3',
											name: 'Короткое замыкание обмотки на землю',
											active: false,
										},
									],
								},
							],
						],
					},
				],
				[
					{
						id: 'p.1.2',
						name: 'Фаза B до вводного автомата',
						resistance: 0,
						voltage: 220,
						groundContact: false,
						wireContact: false,
						malfunctions: [
							{
								id: 'p.1.2.1',
								name: 'Короткое замыкание с фазой A',
								active: false,
							},
							{
								id: 'p.1.2.2',
								name: 'Короткое замыкание с фазой C',
								active: false,
							},
							{ id: 'p.1.2.3', name: 'Обрыв', active: false },
							{
								id: 'p.1.2.4',
								name: 'Короткое замыкание на землю',
								active: false,
							},
							{
								id: 'p.1.2.5',
								name: 'Обрыв провода',
								active: false,
							},
						],
					},
					{
						id: 'p.2.2',
						name: 'Контакты фазы B вводного автомата',
						resistance: 0,
						voltage: 220,
						groundContact: false,
						wireContact: false,
						malfunctions: [
							{
								id: 'p.2.2.1',
								name: 'Плохой контакт на клемме',
								active: false,
							},
							{
								id: 'p.2.2.2',
								name: 'Ложное срабатывание',
								active: false,
							},
							{
								id: 'p.2.2.3',
								name: 'Нет коммутации',
								active: false,
							},
						],
					},
					{
						id: 'p.3.2',
						name: 'Фаза B от автомата до пускателей',
						resistance: 0,
						voltage: 220,
						groundContact: false,
						wireContact: false,
						malfunctions: [
							{
								id: 'p.3.2.1',
								name: 'Короткое замыкание с фазой A',
								active: false,
							},
							{
								id: 'p.3.2.2',
								name: 'Короткое замыкание с фазой C',
								active: false,
							},
							{ id: 'p.3.2.3', name: 'Обрыв', active: false },
							{
								id: 'p.3.2.4',
								name: 'Короткое замыкание на землю',
								active: false,
							},
						],
					},
					{
						branches: [
							{
								id: 'p.4.2.1',
								name: 'Пускатель открыть, контакты фазы B',
								resistance: 0,
								voltage: 0,
								groundContact: false,
								wireContact: false,
								malfunctions: [
									{
										id: 'p.4.2.1.1',
										name: 'Неисправна катушка, пускатель не подтягивается',
										active: false,
									},
									{
										id: 'p.4.2.1.2',
										name: 'Нет контакта в контактной группе',
										active: false,
									},
									{
										id: 'p.4.2.1.3',
										name: 'Залипший контакт в контактной группе',
										active: false,
									},
								],
							},
							{
								id: 'p.4.2.2',
								name: 'Пускатель закрыть, контакты фазы B',
								resistance: 0,
								voltage: 0,
								groundContact: false,
								wireContact: false,
								malfunctions: [
									{
										id: 'p.4.2.2.1',
										name: 'Неисправна катушка, пускатель не подтягивается',
										active: false,
									},
									{
										id: 'p.4.2.2.2',
										name: 'Нет контакта в контактной группе',
										active: false,
									},
									{
										id: 'p.4.2.2.3',
										name: 'Залипший контакт в контактной группе',
										active: false,
									},
								],
							},
						],
					},
					{
						id: 'p.5.2',
						name: 'Фаза С от пускателя до двигателя',
						resistance: 0,
						voltage: 220,
						groundContact: false,
						wireContact: false,
						malfunctions: [
							{
								id: 'p.5.1.1',
								name: 'Короткое замыкание с фазой А',
								active: false,
							},
							{
								id: 'p.5.1.2',
								name: 'Короткое замыкание с фазой B',
								active: false,
							},
							{
								id: 'p.5.1.3',
								name: 'Обрыв',
								active: false,
							},
							{
								id: 'p.5.1.4',
								name: 'Короткое замыкание на землю',
								active: false,
							},
						],
					},
					{
						id: 'p.6.2',
						name: 'Электродвигатель задвижки, обмотка фазы В',
						resistance: 0,
						voltage: 0,
						groundContact: false,
						wireContact: false,
						malfunctions: [
							{
								id: 'p.6.2.1',
								name: 'Обрыв фазы',
								active: false,
							},
							{
								id: 'p.6.2.2',
								name: 'Короткое замыкание между фазами',
								active: false,
							},
							{
								id: 'p.6.2.3',
								name: 'Короткое замыкание обмотки на землю',
								active: false,
							},
						],
					},
				],
				[
					{
						id: 'p.1.3',
						name: 'Фаза C до вводного автомата',
						resistance: 0,
						voltage: 220,
						groundContact: false,
						wireContact: false,
						malfunctions: [
							{
								id: 'p.1.3.1',
								name: 'Короткое замыкание с фазой A',
								active: false,
							},
							{
								id: 'p.1.3.2',
								name: 'Короткое замыкание с фазой B',
								active: false,
							},
							{
								id: 'p.1.3.3',
								name: 'Обрыв',
								active: false,
							},
							{
								id: 'p.1.3.4',
								name: 'Короткое замыкание на землю',
								active: false,
							},
							{
								id: 'p.1.3.5',
								name: 'Обрыв провода',
								active: false,
							},
						],
					},
					{
						id: 'p.2.3',
						name: 'Контакты фазы C вводного автомата',
						resistance: 0,
						voltage: 220,
						groundContact: false,
						wireContact: false,
						malfunctions: [
							{
								id: 'p.2.3.1',
								name: 'Плохой контакт на клемме, нет фазы',
								active: false,
							},
							{
								id: 'p.2.3.2',
								name: 'Ложно выбивает',
								active: false,
							},
							{
								id: 'p.2.3.3',
								name: 'Механическая сборка есть, но нет коммутации',
								active: false,
							},
						],
					},
					{
						id: 'p.3.3',
						name: 'Фаза C от автомата до пускателей',
						resistance: 0,
						voltage: 220,
						groundContact: false,
						wireContact: false,
						malfunctions: [
							{
								id: 'p.3.3.1',
								name: 'Короткое замыкание с фазой A',
								active: false,
							},
							{
								id: 'p.3.3.2',
								name: 'Короткое замыкание с фазой B',
								active: false,
							},
							{
								id: 'p.3.3.3',
								name: 'Обрыв',
								active: false,
							},
							{
								id: 'p.3.3.4',
								name: 'Короткое замыкание на землю',
								active: false,
							},
						],
					},
					{
						branches: [
							[
								{
									id: 'p.4.3.1',
									name: 'Пускатель закрыть, контакты фазы C',
									resistance: 0,
									voltage: 0,
									groundContact: false,
									wireContact: false,
									malfunctions: [
										{
											id: 'p.4.3.1.1',
											name: 'Неисправна катушка, пускатель не срабатывает',
											active: false,
										},
										{
											id: 'p.4.3.1.2',
											name: 'Нет контакта в группе',
											active: false,
										},
										{
											id: 'p.4.3.1.3',
											name: 'Залипание контактов',
											active: false,
										},
									],
								},
								{
									id: 'p.5.3',
									name: 'Фаза C от пускателя до двигателя',
									resistance: 0,
									voltage: 220,
									groundContact: false,
									wireContact: false,
									malfunctions: [
										{
											id: 'p.5.3.1',
											name: 'Короткое замыкание с фазой A',
											active: false,
										},
										{
											id: 'p.5.3.2',
											name: 'Короткое замыкание с фазой B',
											active: false,
										},
										{
											id: 'p.5.3.3',
											name: 'Обрыв',
											active: false,
										},
										{
											id: 'p.5.3.4',
											name: 'Короткое замыкание на землю',
											active: false,
										},
									],
								},
								{
									id: 'p.6.3',
									name: 'Электродвигатель задвижки, обмотка фазы C',
									resistance: 0,
									voltage: 0,
									groundContact: false,
									wireContact: false,
									malfunctions: [
										{
											id: 'p.6.3.1',
											name: 'Обрыв фазы',
											active: false,
										},
										{
											id: 'p.6.3.2',
											name: 'Короткое замыкание между фазами',
											active: false,
										},
										{
											id: 'p.6.3.3',
											name: 'Короткое замыкание обмотки на корпус',
											active: false,
										},
									],
								},
							],
							[
								{
									id: 'p.4.1.1',
									name: 'Пускатель открыть, контакты фазы А',
									resistance: 0,
									voltage: 0,
									groundContact: false,
									wireContact: false,
									malfunctions: [
										{
											id: 'p.4.1.1.1',
											name: 'Неисправна катушка, пускатель не подтягивается',
											active: false,
										},
										{
											id: 'p.4.1.1.2',
											name: 'Нет контакта в контактной группе',
											active: false,
										},
										{
											id: 'p.4.1.1.3',
											name: 'Залипший контакт в контактной группе',
											active: false,
										},
									],
								},
								{
									id: 'p.5.1',
									name: 'Фаза A от пускателя до двигателя',
									resistance: 0,
									voltage: 220,
									groundContact: false,
									wireContact: false,
									malfunctions: [
										{
											id: 'p.5.1.1',
											name: 'Короткое замыкание с фазой C',
											active: false,
										},
										{
											id: 'p.5.1.2',
											name: 'Короткое замыкание с фазой B',
											active: false,
										},
										{
											id: 'p.5.1.3',
											name: 'Обрыв',
											active: false,
										},
										{
											id: 'p.5.1.4',
											name: 'Короткое замыкание на землю',
											active: false,
										},
									],
								},
								{
									id: 'p.6.1',
									name: 'Электродвигатель задвижки, обмотка фазы А',
									resistance: 0,
									voltage: 0,
									groundContact: false,
									wireContact: false,
									malfunctions: [
										{
											id: 'p.6.1.1',
											name: 'Обрыв фазы',
											active: false,
										},
										{
											id: 'p.6.1.2',
											name: 'Короткое замыкание между фазами',
											active: false,
										},
										{
											id: 'p.6.1.3',
											name: 'Короткое замыкание обмотки на землю',
											active: false,
										},
									],
								},
							],
						],
					},
				],
			],
		},
	],
	controlCircuit: [
		{
			id: 'c.1',
			name: 'Автомат питания цепей управления',
			resistance: 0,
			voltage: 0,
			groundContact: false,
			wireContact: false,
			malfunctions: [
				{
					id: 'c.1.1',
					name: 'Плохой контакт на клемме, нет фазы',
					active: false,
				},
				{
					id: 'c.1.2',
					name: 'Ложно выбивает',
					active: false,
				},
				{
					id: 'c.1.3',
					name: 'Собирается механически, но нет коммутации',
					active: false,
				},
			],
		},
		{
			id: 'c.2',
			name: 'Фаза А',
			resistance: 0,
			voltage: 0,
			groundContact: false,
			wireContact: false,
			malfunctions: [
				{
					id: 'c.2.1',
					name: 'Обрыв провода',
					active: false,
				},
				{
					id: 'c.2.2',
					name: 'Короткое замыкание на землю',
					active: false,
				},
				{
					id: 'c.2.3',
					name: 'Короткое замыкание с проводом от фазы на концевой выключатель закрыто',
					active: false,
				},
				{
					id: 'c.2.4',
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
						id: 'c.3.1.1',
						name: 'Концевой выключатель открыто',
						resistance: 0,
						voltage: 0,
						groundContact: false,
						wireContact: false,
						malfunctions: [
							{
								id: 'c.3.1.1.1',
								name: 'Залипший контакт',
								active: false,
							},
							{
								id: 'c.3.1.1.2',
								name: 'Нет контакта',
								active: false,
							},
							{
								id: 'c.3.1.1.3',
								name: 'Не настроен',
								active: false,
							},
						],
					},
					{
						id: 'c.3.1.2',
						name: 'Провод концевого выключателя открыто до клемника КРУЗА-П',
						resistance: 0,
						voltage: 0,
						groundContact: false,
						wireContact: false,
						malfunctions: [
							{
								id: 'c.3.1.2.1',
								name: 'Обрыв провода',
								active: false,
							},
							{
								id: 'c.3.1.2.2',
								name: 'Короткое замыкание на землю',
								active: false,
							},
							{
								id: 'c.3.1.2.3',
								name: 'Короткое замыкание с проводом концевого выключателя закрыто до клемника КРУЗА-П',
								active: false,
							},
							{
								id: 'c.3.1.2.4',
								name: 'Короткое замыкание с проводом фазы двигателя',
								active: false,
							},
						],
					},
					{
						branches: [
							{
								id: 'c.3.1.3.1',
								name: 'Вставка NDI (сигнал «не открыто»)',
								resistance: 0,
								voltage: 0,
								groundContact: false,
								wireContact: false,
								malfunctions: [
									{
										id: 'c.3.1.3.1.1',
										name: 'Нет контакта, сигнал не проходит',
										active: false,
									},
									{
										id: 'c.3.1.3.1.2',
										name: 'Ложно сработанная, сигнал не снимается',
										active: false,
									},
								],
							},
							[
								{
									branches: [
										{
											id: 'c.3.1.3.2.1.1',
											name: 'Вставка NDI (команда открыть с ПТК)',
											resistance: 0,
											voltage: 0,
											groundContact: false,
											wireContact: false,
											malfunctions: [
												{
													id: 'c.3.1.3.2.1.1.1',
													name: 'Нет контакта, команда не уходит',
													active: false,
												},
												{
													id: 'c.3.1.3.2.1.1.2',
													name: 'Ложно сработанная, команда постоянно висит',
													active: false,
												},
											],
										},
										{
											id: 'c.3.1.3.2.1.2',
											name: 'Кнопка КРУЗА-П (команда открыть с КРУЗА-П)',
											resistance: 0,
											voltage: 0,
											groundContact: false,
											wireContact: false,
											malfunctions: [
												{
													id: 'c.3.1.3.2.1.2.1',
													name: 'Нет контакта, команда не уходит',
													active: false,
												},
												{
													id: 'c.3.1.3.2.1.2.2',
													name: 'Ложно сработанная, команда постоянно висит',
													active: false,
												},
											],
										},
									],
								},
								{
									id: 'c.3.1.3.2.2',
									name: 'Блокировка включения пускателя на открыте',
									resistance: 0,
									voltage: 0,
									groundContact: false,
									wireContact: false,
									malfunctions: [
										{
											id: 'c.3.1.3.2.2.1',
											name: 'Нет контакта',
											active: false,
										},
										{
											id: 'c.3.1.3.2.2.2',
											name: 'Ложно сработанный контакт',
											active: false,
										},
									],
								},
								{
									id: 'c.3.1.3.2.3',
									name: 'Катушка пускателя открыть',
									resistance: 0,
									voltage: 0,
									groundContact: false,
									wireContact: false,
									malfunctions: [
										{
											id: 'c.3.1.3.2.3.1',
											name: 'Неисправна катушка, пускатель не подтягивается',
											active: false,
										},
									],
								},
							],
							{
								id: 'c.3.1.3.3',
								name: 'Лампа в КРУЗА-П закрыто',
								resistance: 0,
								voltage: 0,
								groundContact: false,
								wireContact: false,
								malfunctions: [
									{
										id: 'c.3.1.3.3.1',
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
						id: 'c.3.2.1',
						name: 'Концевой выключатель закрыто',
						resistance: 0,
						voltage: 0,
						groundContact: false,
						wireContact: false,
						malfunctions: [
							{
								id: 'c.3.2.1.1',
								name: 'Залипший контакт',
								active: false,
							},
							{
								id: 'c.3.2.1.2',
								name: 'Нет контакта',
								active: false,
							},
							{
								id: 'c.3.2.1.3',
								name: 'Не настроен',
								active: false,
							},
						],
					},
					{
						id: 'c.3.2.2',
						name: 'Провод концевого выключателя закрыто до клемника КРУЗА-П',
						resistance: 0,
						voltage: 0,
						groundContact: false,
						wireContact: false,
						malfunctions: [
							{
								id: 'c.3.2.2.1',
								name: 'Обрыв провода',
								active: false,
							},
							{
								id: 'c.3.2.2.2',
								name: 'Короткое замыкание на землю',
								active: false,
							},
							{
								id: 'c.3.2.2.3',
								name: 'Короткое замыкание с проводом концевого выключателя закрыто до клемника КРУЗА-П',
								active: false,
							},
							{
								id: 'c.3.2.2.4',
								name: 'Короткое замыкание с проводом фазы двигателя',
								active: false,
							},
						],
					},
					{
						branches: [
							{
								id: 'c.3.2.3.1',
								name: 'Вставка NDI (сигнал «не закрыто»)',
								resistance: 0,
								voltage: 0,
								groundContact: false,
								wireContact: false,
								malfunctions: [
									{
										id: 'c.3.2.3.1.1',
										name: 'Нет контакта, сигнал не проходит',
										active: false,
									},
									{
										id: 'c.3.2.3.1.2',
										name: 'Ложно сработанная, сигнал не снимается',
										active: false,
									},
								],
							},
							[
								{
									branches: [
										{
											id: 'c.3.2.3.2.1.1',
											name: 'Вставка NDI (команда закрыть с ПТК)',
											resistance: 0,
											voltage: 0,
											groundContact: false,
											wireContact: false,
											malfunctions: [
												{
													id: 'c.3.2.3.2.1.1.1',
													name: 'Нет контакта, команда не уходит',
													active: false,
												},
												{
													id: 'c.3.2.3.2.1.1.2',
													name: 'Ложно сработанная, команда постоянно висит',
													active: false,
												},
											],
										},
										{
											id: 'c.3.2.3.2.1.2',
											name: 'Кнопка КРУЗА-П (команда закрыть с КРУЗА-П)',
											resistance: 0,
											voltage: 0,
											groundContact: false,
											wireContact: false,
											malfunctions: [
												{
													id: 'c.3.2.3.2.1.2.1',
													name: 'Нет контакта, команда не уходит',
													active: false,
												},
												{
													id: 'c.3.2.3.2.1.2.2',
													name: 'Ложно сработанная, команда постоянно висит',
													active: false,
												},
											],
										},
									],
								},
								{
									id: 'c.3.2.3.2.2',
									name: 'Блокировка включения пускателя на закрыть',
									resistance: 0,
									voltage: 0,
									groundContact: false,
									wireContact: false,
									malfunctions: [
										{
											id: 'c.3.2.3.2.2.1',
											name: 'Нет контакта',
											active: false,
										},
										{
											id: 'c.3.2.3.2.2.2',
											name: 'Ложно сработанный контакт',
											active: false,
										},
									],
								},
								{
									id: 'c.3.2.3.2.3',
									name: 'Катушка пускателя закрыть',
									resistance: 0,
									voltage: 0,
									groundContact: false,
									wireContact: false,
									malfunctions: [
										{
											id: 'c.3.2.3.2.3.1',
											name: 'Неисправна катушка, пускатель не подтягивается',
											active: false,
										},
									],
								},
							],
							{
								id: 'c.3.2.3.3',
								name: 'Лампа в КРУЗА-П открыто',
								resistance: 0,
								voltage: 0,
								groundContact: false,
								wireContact: false,
								malfunctions: [
									{
										id: 'c.3.2.3.3.1',
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
			id: 'c.4',
			name: 'Нейтраль',
			resistance: 0,
			voltage: 0,
			groundContact: false,
			wireContact: false,
			malfunctions: [
				{
					id: 'c.4.1',
					name: 'обрыв',
					active: false,
				},
			],
		},
	],
};

const measuringPoints = {
	powerPoints: [
		{
			id: 'p.p.0.1',
			name: 'Фаза А до вводного автомата',
		},
		{
			id: 'p.p.0.2',
			name: 'Фаза B до вводного автомата',
		},
		{
			id: 'p.p.0.3',
			name: 'Фаза C до вводного автомата',
		},
		{
			id: 'p.p.2.1',
			name: 'Фаза А после вводного автомата',
		},
		{
			id: 'p.p.2.2',
			name: 'Фаза B после вводного автомата',
		},
		{
			id: 'p.p.2.3',
			name: 'Фаза C после вводного автомата',
		},
		{
			id: 'p.p.3.1',
			name: 'Фаза А перед пускателем',
		},
		{
			id: 'p.p.3.2',
			name: 'Фаза B перед пускателем',
		},
		{
			id: 'p.p.3.3',
			name: 'Фаза C перед пускателем',
		},
		{
			id: 'p.p.4.1',
			name: 'Фаза А после пускателя',
		},
		{
			id: 'p.p.4.2',
			name: 'Фаза B после пускателя',
		},
		{
			id: 'p.p.4.3',
			name: 'Фаза C после пускателя',
		},
		{
			id: 'p.p.5.1',
			name: 'Фаза А двигателя',
		},
		{
			id: 'p.p.5.2',
			name: 'Фаза B двигателя',
		},
		{
			id: 'p.p.5.3',
			name: 'Фаза C двигателя',
		},
	],
	circuitPoints: [
		{
			id: 'p.c.0',
			name: 'Фаза А от вводного автомата',
		},
		{
			id: 'p.c.1',
			name: 'Фаза от автомата питания цепей управления',
		},
		{
			id: 'p.c.2',
			name: 'Фаза цепей управления перед концевыми выключателями',
		},
		{
			id: 'p.c.3.2.1',
			name: 'Фаза цепей управления после концевого выключателя открыто',
		},
		{
			id: 'p.c.3.2.2',
			name: 'Фаза цепей управления после концевого выключателя закрыто',
		},
		{
			id: 'p.c.3.2.3.2.1',
			name: 'Фаза цепей управления после комынды открыть',
		},
		{
			id: 'p.c.3.2.3.2.2',
			name: 'Фаза цепей управления после комынды закрыть',
		},
		{
			id: 'p.c.n',
			name: 'Нейтраль',
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
		setvoltage() {},

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
	setvoltage,
	setGroundContact,
	setWireContact,
} = faultsSlice.actions;

// Экспорт редьюсера
export default faultsSlice.reducer;
