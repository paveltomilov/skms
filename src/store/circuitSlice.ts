import {
	OPEN_FROM_KRUZAP_ID,
	LIMIT_SWITCH_CLOSE_ID,
	LIMIT_SWITCH_OPEN_ID,
	CLOSE_FROM_KRUZAP_ID,
	OPEN_FROM_PTK_ID,
	CLOSE_FROM_PTK_ID,
	HIGH_RESISTANCE,
} from '@/shared/configs/scheme';
import { findElementByID } from '@/shared/utils/scheme';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Malfunction {
	id: string;
	name: string;
	active: boolean;
}

export interface CircuitElement {
	id: string;
	name: string;
	resistance: number;
	malfunctions: Malfunction[];
}

export type CircuitBranch = CircuitElement | CircuitGroup;
export interface CircuitGroup extends Array<CircuitBranch> {}

export interface InitialSchemeState {
	powerCircuit: CircuitBranch[][];
	controlCircuit: CircuitBranch[];
}

export const initialState: InitialSchemeState = {
	powerCircuit: [
		[
			{
				id: 'p.1.1',
				name: 'Провод от фазы А до автомата',
				resistance: 0.1,
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
				id: 'p.2.1',
				name: 'Сухой контакт фазы А автомата',
				resistance: 0,
				malfunctions: [
					{
						id: 'p.2.1.1',
						name: 'Плохой контакт на клемме, нет одной фазы',
						active: false,
					},
					{
						id: 'p.2.1.2',
						name: 'Ложно выбивает',
						active: false,
					},
					{
						id: 'p.2.1.3',
						name: 'Собирается механически, но нет коммутации',
						active: false,
					},
				],
			},
			{
				id: 'p.3.1',
				name: 'Провод фазы A от автомата до пускателей',
				resistance: 0.1,
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
			[
				[
					{
						id: 'p.4.1.1',
						name: 'Контакты пускателя открыть фаза A',
						resistance: 1000000000,
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
						resistance: 0.1,
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
						resistance: 4.1,
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
						id: 'p.4.2.1',
						name: 'Контакты пускателя закрыть фаза С',
						resistance: 1000000000,
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
						id: 'p.5.3',
						name: 'Фаза С от пускателя до двигателя',
						resistance: 0.1,
						malfunctions: [
							{
								id: 'p.5.3.1',
								name: 'Короткое замыкание с фазой C',
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
						name: 'Электродвигатель задвижки, обмотка фазы С',
						resistance: 4.1,
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
								name: 'Короткое замыкание обмотки на землю',
								active: false,
							},
						],
					},
				],
			],
		],
		[
			{
				id: 'p.1.2',
				name: 'Провод от фазы В до автомата',
				resistance: 0.1,
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
				name: 'Сухой контакт  фазы В автомата',
				resistance: 0,
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
				name: 'Провод фазы B от автомата до пускателей',
				resistance: 0.1,
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
			[
				{
					id: 'p.4.1.2',
					name: 'Контакты пускателя открыть фаза В',
					resistance: 1000000000,
					malfunctions: [
						{
							id: 'p.4.1.2.1',
							name: 'Неисправна катушка, пускатель не подтягивается',
							active: false,
						},
						{
							id: 'p.4.1.2.2',
							name: 'Нет контакта в контактной группе',
							active: false,
						},
						{
							id: 'p.4.1.2.3',
							name: 'Залипший контакт в контактной группе',
							active: false,
						},
					],
				},
				{
					id: 'p.4.2.2',
					name: 'Контакты пускателя закрыть фаза В',
					resistance: 1000000000,
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
			{
				id: 'p.5.2',
				name: 'Фаза В от пускателя до двигателя',
				resistance: 0.1,
				malfunctions: [
					{
						id: 'p.5.2.1',
						name: 'Короткое замыкание с фазой А',
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
				name: 'Электродвигатель задвижки, обмотка фазы В',
				resistance: 4.1,
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
				name: 'Провод от фазы С до автомата',
				resistance: 0.1,
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
				name: 'Сухой контакт  фазы С автомата',
				resistance: 0,
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
				name: 'Провод фазы C от автомата до пускателей',
				resistance: 0.1,
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
			[
				[
					{
						id: 'p.4.1.3',
						name: 'Контакты пускателя открыть фаза С',
						resistance: 1000000000,
						malfunctions: [
							{
								id: 'p.4.1.3.1',
								name: 'Неисправна катушка, пускатель не срабатывает',
								active: false,
							},
							{
								id: 'p.4.1.3.2',
								name: 'Нет контакта в группе',
								active: false,
							},
							{
								id: 'p.4.1.3.3',
								name: 'Залипание контактов',
								active: false,
							},
						],
					},
					{
						id: 'p.5.3',
						name: 'Фаза С от пускателя до двигателя',
						resistance: 0.1,
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
						resistance: 4.1,
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
						id: 'p.4.2.3',
						name: 'Контакты пускателя закрыть фаза A ',
						resistance: 1000000000,
						malfunctions: [
							{
								id: 'p.4.2.3.1',
								name: 'Неисправна катушка, пускатель не подтягивается',
								active: false,
							},
							{
								id: 'p.4.2.3.2',
								name: 'Нет контакта в контактной группе',
								active: false,
							},
							{
								id: 'p.4.2.3.3',
								name: 'Залипший контакт в контактной группе',
								active: false,
							},
						],
					},
					{
						id: 'p.5.1',
						name: 'Фаза A от пускателя до двигателя',
						resistance: 0.1,
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
						resistance: 4.1,
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
		],
	],
	controlCircuit: [
		{
			id: 'c.1',
			name: 'Автомат питания цепей управления',
			resistance: 0,
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
			name: 'Провод фазы после автомата',
			resistance: 0.1,
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
		[
			[
				//ветка открыть
				{
					id: LIMIT_SWITCH_OPEN_ID,
					name: 'Концевой выключатель открыто',
					resistance: 0,
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
					resistance: 0.1,
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
				[
					{
						id: 'c.3.1.3.1',
						name: 'Вставка NDI (сигнал «не открыто»)',
						resistance: 0,
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
						[
							{
								id: OPEN_FROM_PTK_ID,
								name: 'Вставка NDI (команда открыть с ПТК)',
								resistance: 1000000000,
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
								id: OPEN_FROM_KRUZAP_ID,
								name: 'Кнопка КРУЗА-П (команда открыть с КРУЗА-П)',
								resistance: 1000000000,
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
						{
							id: 'c.3.1.3.2.2',
							name: 'Блокировка включения пускателя на открытие',
							resistance: HIGH_RESISTANCE,
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
							resistance: HIGH_RESISTANCE,
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
						resistance: 4800,
						malfunctions: [
							{
								id: 'c.3.1.3.3.1',
								name: 'Перегорела',
								active: false,
							},
						],
					},
				],
			],
			[
				//ветка закрыть
				{
					id: LIMIT_SWITCH_CLOSE_ID,
					name: 'Концевой выключатель закрыто',
					resistance: 0,
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
					resistance: 0.1,
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
				[
					{
						id: 'c.3.2.3.1',
						name: 'Вставка NDI (сигнал «не закрыто»)',
						resistance: 0,
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
						[
							{
								id: CLOSE_FROM_PTK_ID,
								name: 'Вставка NDI (команда закрыть с ПТК)',
								resistance: 1000000000,
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
								id: CLOSE_FROM_KRUZAP_ID,
								name: 'Кнопка КРУЗА-П (команда закрыть с КРУЗА-П)',
								resistance: 1000000000,
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
						{
							id: 'c.3.2.3.2.2',
							name: 'Блокировка включения пускателя на закрыть',
							resistance: HIGH_RESISTANCE,
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
							resistance: HIGH_RESISTANCE,
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
						resistance: 4800,
						malfunctions: [
							{
								id: 'c.3.2.3.3.1',
								name: 'Перегорела',
								active: false,
							},
						],
					},
				],
			],
		],
	],
};

const circuitSlice = createSlice({
	name: 'circuit',
	initialState,
	reducers: {
		// Активация неисправности
		activateMalfunction(
			state: InitialSchemeState,
			action: PayloadAction<{ id: string }>,
		) {
			const { id } = action.payload; // id неисправности
			const elementId = id.slice(0, -2); // id для поиска элемента
			const malfunction = +id.slice(-1) - 1; // индекс искомой неисправности в массиве malfunction
			const element = findElementByID(elementId, state);

			if (element) {
				element.malfunctions[malfunction].active = true;
			}
		},

		// Деактивация неисправности
		deactivateMalfunction(
			state: InitialSchemeState,
			action: PayloadAction<{ id: string }>,
		) {
			const { id } = action.payload; // id неисправности
			const elementId = id.slice(0, -2); // id для поиска элемента
			const malfunction = +id.slice(-1) - 1; // индекс искомой неисправности в массиве malfunction
			const element = findElementByID(elementId, state);

			if (element) {
				element.malfunctions[malfunction].active = false;
			}
		},

		// Изменение сопротивления
		setResistance(
			state,
			action: PayloadAction<{ id: string; value: number }>,
		) {
			const { id, value } = action.payload;
			const element = findElementByID(id, state);
			if (element) {
				element.resistance = value;
			}
		},
	},
});

// Экспорт экшенов
export const { activateMalfunction, deactivateMalfunction, setResistance } =
	circuitSlice.actions;

// Экспорт редьюсера
export default circuitSlice.reducer;
