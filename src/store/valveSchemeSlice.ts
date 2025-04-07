import { createSlice } from '@reduxjs/toolkit';
// Базовый интерфейс для неисправностей
interface Malfunction {
	id: string;
	name: string;
	active: boolean;
}

// Базовый интерфейс для всех элементов схемы
interface BaseElement {
	id?: string;
	name?: string;
	resistance?: number;
	voltagePresent?: number;
	groundContact?: boolean;
	wireContact?: boolean;
	malfunctions?: Malfunction[];
}

// Интерфейс для обычного компонента
interface CircuitComponent extends BaseElement {
	id: string;
	name: string;
	resistance: number;
	voltagePresent: number;
	groundContact: boolean;
	wireContact: boolean;
	malfunctions: Malfunction[];
}

// Интерфейс для ветви (используем "branches" как в ваших данных)
interface Branch extends BaseElement {
	branches: Array<CircuitComponent | Branch>;
}

// Типы для цепей
type PowerCircuitElement = CircuitComponent | Branch;
type ControlCircuitElement = CircuitComponent | Branch;

// Финальный интерфейс состояния
interface InitialState {
	powerCircuit: PowerCircuitElement[];
	controlCircuit: ControlCircuitElement[];
}

// const initialState: InitialState = {
// 	powerCircuit: [
// 		{
// 			id: '1',
// 			name: 'Вводной автомат',
// 			resistance: 0,
// 			voltagePresent: 220,
// 			groundContact: false,
// 			wireContact: false,
// 			malfunctions: [
// 				{
// 					id: 101,
// 					name: 'Плохой контакт на клемме, нет одной фазы',
// 					active: false,
// 				},
// 				{ id: 102, name: 'Ложно выбивает', active: false },
// 				{
// 					id: 103,
// 					name: 'Собирается механически, но нет коммутации',
// 					active: false,
// 				},
// 			],
// 		},
// 		{
// 			branches: [
// 				{
// 					id: '2.1',
// 					name: 'Фаза A',
// 					resistance: 0,
// 					voltagePresent: 220,
// 					groundContact: false,
// 					wireContact: false,
// 					malfunctions: [
// 						{
// 							id: 211,
// 							name: 'Короткое замыкание с фазой C',
// 							active: false,
// 						},
// 						{
// 							id: 212,
// 							name: 'Короткое замыкание с фазой B',
// 							active: false,
// 						},
// 						{ id: 213, name: 'Обрыв', active: false },
// 						{
// 							id: 214,
// 							name: 'Короткое замыкание на землю',
// 							active: false,
// 						},
// 					],
// 				},
// 				{
// 					id: 22,
// 					name: 'Фаза B',
// 					resistance: 0,
// 					voltagePresent: 220,
// 					groundContact: false,
// 					wireContact: false,
// 					malfunctions: [
// 						{
// 							id: 221,
// 							name: 'Короткое замыкание с фазой C',
// 							active: false,
// 						},
// 						{
// 							id: 222,
// 							name: 'Короткое замыкание с фазой A',
// 							active: false,
// 						},
// 						{ id: 223, name: 'Обрыв', active: false },
// 						{
// 							id: 224,
// 							name: 'Короткое замыкание на землю',
// 							active: false,
// 						},
// 					],
// 				},
// 				{
// 					id: 23,
// 					name: 'Фаза C',
// 					resistance: 0,
// 					voltagePresent: 220,
// 					groundContact: false,
// 					wireContact: false,
// 					malfunctions: [
// 						{
// 							id: 231,
// 							name: 'Короткое замыкание с фазой A',
// 							active: false,
// 						},
// 						{
// 							id: 232,
// 							name: 'Короткое замыкание с фазой B',
// 							active: false,
// 						},
// 						{ id: 233, name: 'Обрыв', active: false },
// 						{
// 							id: 234,
// 							name: 'Короткое замыкание на землю',
// 							active: false,
// 						},
// 					],
// 				},
// 			],
// 		},
// 		{
// 			branches: [
// 				{
// 					id: 31,
// 					name: 'Пускатель закрыть',
// 					resistance: 0,
// 					voltagePresent: 0,
// 					groundContact: false,
// 					wireContact: false,
// 					malfunctions: [
// 						{
// 							id: 311,
// 							name: 'Неисправна катушка, пускатель не подтягивается',
// 							active: false,
// 						},
// 						{
// 							id: 312,
// 							name: 'Нет контакта в контактной группе',
// 							active: false,
// 						},
// 						{
// 							id: 313,
// 							name: 'Залипший контакт в контактной группе',
// 							active: false,
// 						},
// 					],
// 				},
// 				{
// 					id: 32,
// 					name: 'Пускатель открыть',
// 					resistance: 0,
// 					voltagePresent: 0,
// 					groundContact: false,
// 					wireContact: false,
// 					malfunctions: [
// 						{
// 							id: 321,
// 							name: 'Неисправна катушка, пускатель не подтягивается',
// 							active: false,
// 						},
// 						{
// 							id: 322,
// 							name: 'Нет контакта в контактной группе',
// 							active: false,
// 						},
// 						{
// 							id: 323,
// 							name: 'Залипший контакт в контактной группе',
// 							active: false,
// 						},
// 					],
// 				},
// 			],
// 		},
// 		{
// 			branches: [
// 				{
// 					id: 41,
// 					name: 'Фаза A',
// 					resistance: 0,
// 					voltagePresent: 220,
// 					groundContact: false,
// 					wireContact: false,
// 					malfunctions: [
// 						{
// 							id: 411,
// 							name: 'Короткое замыкание с фазой C',
// 							active: false,
// 						},
// 						{
// 							id: 412,
// 							name: 'Короткое замыкание с фазой B',
// 							active: false,
// 						},
// 						{ id: 413, name: 'Обрыв', active: false },
// 						{
// 							id: 414,
// 							name: 'Короткое замыкание на землю',
// 							active: false,
// 						},
// 					],
// 				},
// 				{
// 					id: 42,
// 					name: 'Фаза B',
// 					resistance: 0,
// 					voltagePresent: 220,
// 					groundContact: false,
// 					wireContact: false,
// 					malfunctions: [
// 						{
// 							id: 421,
// 							name: 'Короткое замыкание с фазой C',
// 							active: false,
// 						},
// 						{
// 							id: 422,
// 							name: 'Короткое замыкание с фазой A',
// 							active: false,
// 						},
// 						{ id: 423, name: 'Обрыв', active: false },
// 						{
// 							id: 424,
// 							name: 'Короткое замыкание на землю',
// 							active: false,
// 						},
// 					],
// 				},
// 				{
// 					id: 43,
// 					name: 'Фаза C',
// 					resistance: 0,
// 					voltagePresent: 220,
// 					groundContact: false,
// 					wireContact: false,
// 					malfunctions: [
// 						{
// 							id: 431,
// 							name: 'Короткое замыкание с фазой A',
// 							active: false,
// 						},
// 						{
// 							id: 432,
// 							name: 'Короткое замыкание с фазой B',
// 							active: false,
// 						},
// 						{ id: 433, name: 'Обрыв', active: false },
// 						{
// 							id: 434,
// 							name: 'Короткое замыкание на землю',
// 							active: false,
// 						},
// 					],
// 				},
// 			],
// 		},
// 		{
// 			id: 5,
// 			name: 'Электродвигатель задвижки',
// 			resistance: 0,
// 			voltagePresent: 0,
// 			groundContact: false,
// 			wireContact: false,
// 			malfunctions: [
// 				{ id: 501, name: 'Обрыв фазы', active: false },
// 				{
// 					id: 502,
// 					name: 'Короткое замыкание между фазами',
// 					active: false,
// 				},
// 				{
// 					id: 503,
// 					name: 'Короткое замыкание обмотки на землю',
// 					active: false,
// 				},
// 			],
// 		},
// 	],

// 	controlCircuit: [
// 		{
// 			id: 6,
// 			name: 'Автомат питания цепей управления',
// 			resistance: 0,
// 			voltagePresent: 0,
// 			groundContact: false,
// 			wireContact: false,
// 			malfunctions: [
// 				{
// 					id: 601,
// 					name: 'Плохой контакт на клемме, нет фазы',
// 					active: false,
// 				},
// 				{ id: 602, name: 'Ложно выбивает', active: false },
// 				{
// 					id: 603,
// 					name: 'Собирается механически, но нет коммутации',
// 					active: false,
// 				},
// 			],
// 		},
// 		{
// 			id: 7,
// 			name: 'Фаза А',
// 			resistance: 0,
// 			voltagePresent: 0,
// 			groundContact: false,
// 			wireContact: false,
// 			malfunctions: [
// 				{ id: 701, name: 'Обрыв провода', active: false },
// 				{ id: 702, name: 'Короткое замыкание на землю', active: false },
// 				{
// 					id: 703,
// 					name: 'Короткое замыкание с проводом от фазы на концевой выключатель закрыто',
// 					active: false,
// 				},
// 				{
// 					id: 704,
// 					name: 'Короткое замыкание с проводом фазы двигателя',
// 					active: false,
// 				},
// 			],
// 		},
// 		{
// 			branches: [
// 				{
// 					branches: [
// 						{
// 							id: 8,
// 							name: 'Концевой выключатель открыто',
// 							resistance: 0,
// 							voltagePresent: 0,
// 							groundContact: false,
// 							wireContact: false,
// 							malfunctions: [
// 								{
// 									id: 801,
// 									name: 'Залипший контакт',
// 									active: false,
// 								},
// 								{
// 									id: 802,
// 									name: 'Нет контакта',
// 									active: false,
// 								},
// 								{ id: 803, name: 'Не настроен', active: false },
// 							],
// 						},
// 						{
// 							id: 9,
// 							name: 'Провод концевого выключателя открыто до клемника КРУЗА-П',
// 							resistance: 0,
// 							voltagePresent: 0,
// 							groundContact: false,
// 							wireContact: false,
// 							malfunctions: [
// 								{
// 									id: 901,
// 									name: 'Обрыв провода',
// 									active: false,
// 								},
// 								{
// 									id: 902,
// 									name: 'Короткое замыкание на землю',
// 									active: false,
// 								},
// 								{
// 									id: 903,
// 									name: 'Короткое замыкание с проводом концевого выключателя закрыто до клемника КРУЗА-П',
// 									active: false,
// 								},
// 								{
// 									id: 904,
// 									name: 'Короткое замыкание с проводом фазы двигателя',
// 									active: false,
// 								},
// 							],
// 						},
// 						{
// 							branches: [
// 								{
// 									id: 10,
// 									name: 'Вставка NDI (сигнал «не открыто»)',
// 									resistance: 0,
// 									voltagePresent: 0,
// 									groundContact: false,
// 									wireContact: false,
// 									malfunctions: [
// 										{
// 											id: 1001,
// 											name: 'Нет контакта, сигнал не проходит',
// 											active: false,
// 										},
// 										{
// 											id: 1002,
// 											name: 'Ложно сработанная, сигнал не снимается',
// 											active: false,
// 										},
// 									],
// 								},
// 								{
// 									branches: [
// 										{
// 											branches: [
// 												{
// 													id: 11,
// 													name: 'Вставка NDI (команда открыть с ПТК)',
// 													resistance: 0,
// 													voltagePresent: 0,
// 													groundContact: false,
// 													wireContact: false,
// 													malfunctions: [
// 														{
// 															id: 1101,
// 															name: 'Нет контакта, команда не уходит',
// 															active: false,
// 														},
// 														{
// 															id: 1102,
// 															name: 'Ложно сработанная, команда постоянно висит',
// 															active: false,
// 														},
// 													],
// 												},
// 												{
// 													id: 12,
// 													name: 'Кнопка КРУЗА-П (команда открыть с КРУЗА-П)',
// 													resistance: 0,
// 													voltagePresent: 0,
// 													groundContact: false,
// 													wireContact: false,
// 													malfunctions: [
// 														{
// 															id: 1201,
// 															name: 'Нет контакта, команда не уходит',
// 															active: false,
// 														},
// 														{
// 															id: 1202,
// 															name: 'Ложно сработанная, команда постоянно висит',
// 															active: false,
// 														},
// 													],
// 												},
// 											],
// 										},
// 										{
// 											id: 13,
// 											name: 'Блокировка включения пускателя открыть',
// 											resistance: 0,
// 											voltagePresent: 0,
// 											groundContact: false,
// 											wireContact: false,
// 											malfunctions: [
// 												{
// 													id: 1301,
// 													name: 'Нет контакта',
// 													active: false,
// 												},
// 												{
// 													id: 1302,
// 													name: 'Ложно сработанный контакт',
// 													active: false,
// 												},
// 											],
// 										},
// 										{
// 											id: 14,
// 											name: 'Катушка пускателя открыть',
// 											resistance: 0,
// 											voltagePresent: 0,
// 											groundContact: false,
// 											wireContact: false,
// 											malfunctions: [
// 												{
// 													id: 1401,
// 													name: 'Неисправна катушка, пускатель не подтягивается',
// 													active: false,
// 												},
// 											],
// 										},
// 									],
// 								},
// 								{
// 									id: 15,
// 									name: 'Лампа в КРУЗА-П закрыто',
// 									resistance: 0,
// 									voltagePresent: 0,
// 									groundContact: false,
// 									wireContact: false,
// 									malfunctions: [
// 										{
// 											id: 1501,
// 											name: 'Перегорела',
// 											active: false,
// 										},
// 									],
// 								},
// 							],
// 						},
// 					],
// 				},
// 				{
// 					branches: [
// 						{
// 							id: 16,
// 							name: 'Концевой выключатель закрыто',
// 							resistance: 0,
// 							voltagePresent: 0,
// 							groundContact: false,
// 							wireContact: false,
// 							malfunctions: [
// 								{
// 									id: 1601,
// 									name: 'Залипший контакт',
// 									active: false,
// 								},
// 								{
// 									id: 1602,
// 									name: 'Нет контакта',
// 									active: false,
// 								},
// 								{
// 									id: 1603,
// 									name: 'Не настроен',
// 									active: false,
// 								},
// 							],
// 						},
// 						{
// 							id: 17,
// 							name: 'Провод концевого выключателя закрыто до клемника КРУЗА-П',
// 							resistance: 0,
// 							voltagePresent: 0,
// 							groundContact: false,
// 							wireContact: false,
// 							malfunctions: [
// 								{
// 									id: 1701,
// 									name: 'Обрыв провода',
// 									active: false,
// 								},
// 								{
// 									id: 1702,
// 									name: 'Короткое замыкание на землю',
// 									active: false,
// 								},
// 								{
// 									id: 1703,
// 									name: 'Короткое замыкание с проводом концевого выключателя открыто до клемника КРУЗА-П',
// 									active: false,
// 								},
// 								{
// 									id: 1704,
// 									name: 'Короткое замыкание с проводом фазы двигателя',
// 									active: false,
// 								},
// 							],
// 						},
// 						{
// 							branches: [
// 								{
// 									id: 18,
// 									name: 'Вставка NDO (сигнал «не закрыто»)',
// 									resistance: 0,
// 									voltagePresent: 0,
// 									groundContact: false,
// 									wireContact: false,
// 									malfunctions: [
// 										{
// 											id: 1801,
// 											name: 'Нет контакта, сигнал не проходит',
// 											active: false,
// 										},
// 										{
// 											id: 1802,
// 											name: 'Ложно сработанная, сигнал не снимается',
// 											active: false,
// 										},
// 									],
// 								},
// 								{
// 									branches: [
// 										{
// 											branches: [
// 												{
// 													id: 19,
// 													name: 'Вставка NDI (команда закрыть с ПТК)',
// 													resistance: 0,
// 													voltagePresent: 0,
// 													groundContact: false,
// 													wireContact: false,
// 													malfunctions: [
// 														{
// 															id: 1901,
// 															name: 'Нет контакта, команда не уходит',
// 															active: false,
// 														},
// 														{
// 															id: 1902,
// 															name: 'Ложно сработанная, команда постоянно висит',
// 															active: false,
// 														},
// 													],
// 												},
// 												{
// 													id: 20,
// 													name: 'Кнопка КРУЗА-П (команда закрыть с КРУЗА-П)',
// 													resistance: 0,
// 													voltagePresent: 0,
// 													groundContact: false,
// 													wireContact: false,
// 													malfunctions: [
// 														{
// 															id: 2001,
// 															name: 'Нет контакта, команда не уходит',
// 															active: false,
// 														},
// 														{
// 															id: 2002,
// 															name: 'Ложно сработанная, команда постоянно висит',
// 															active: false,
// 														},
// 													],
// 												},
// 											],
// 										},
// 										{
// 											id: 21,
// 											name: 'Блокировка включения пускателя закрыть',
// 											resistance: 0,
// 											voltagePresent: 0,
// 											groundContact: false,
// 											wireContact: false,
// 											malfunctions: [
// 												{
// 													id: 2101,
// 													name: 'Нет контакта',
// 													active: false,
// 												},
// 												{
// 													id: 2102,
// 													name: 'Ложно сработанный контакт',
// 													active: false,
// 												},
// 											],
// 										},
// 										{
// 											id: 22,
// 											name: 'Катушка пускателя закрыть',
// 											resistance: 0,
// 											voltagePresent: 0,
// 											groundContact: false,
// 											wireContact: false,
// 											malfunctions: [
// 												{
// 													id: 2201,
// 													name: 'Неисправна катушка, пускатель не подтягивается',
// 													active: false,
// 												},
// 											],
// 										},
// 									],
// 								},
// 								{
// 									id: 23,
// 									name: 'Лампа в КРУЗА-П открыто',
// 									resistance: 0,
// 									voltagePresent: 0,
// 									groundContact: false,
// 									wireContact: false,
// 									malfunctions: [
// 										{
// 											id: 2301,
// 											name: 'Перегорела',
// 											active: false,
// 										},
// 									],
// 								},
// 							],
// 						},
// 					],
// 				},
// 			],
// 		},
// 	],
// };

interface Malfunction {
	id: string;
	name: string;
	active: boolean;
  }
  
  interface CircuitComponent {
	id: string;
	name: string;
	resistance: number;
	voltagePresent: number;
	groundContact: boolean;
	wireContact: boolean;
	malfunctions: Malfunction[];
  }
  
  interface Branch {
	branches: Array<CircuitComponent | Branch>;
  }
  
  type CircuitElement = CircuitComponent | Branch;
  
  interface InitialState {
	powerCircuit: CircuitElement[];
	controlCircuit: CircuitElement[];
  }
  
  const initialState: InitialState = {
	powerCircuit: [
	  {
		id: '1',
		name: 'Вводной автомат',
		resistance: 0,
		voltagePresent: 220,
		groundContact: false,
		wireContact: false,
		malfunctions: [
		  { id: '101', name: 'Плохой контакт на клемме, нет одной фазы', active: false },
		  { id: '102', name: 'Ложно выбивает', active: false },
		  { id: '103', name: 'Собирается механически, но нет коммутации', active: false }
		]
	  },
	  {
		branches: [
		  {
			id: '2.1',
			name: 'Фаза A',
			resistance: 0,
			voltagePresent: 220,
			groundContact: false,
			wireContact: false,
			malfunctions: [
			  { id: '211', name: 'Короткое замыкание с фазой C', active: false },
			  { id: '212', name: 'Короткое замыкание с фазой B', active: false },
			  { id: '213', name: 'Обрыв', active: false },
			  { id: '214', name: 'Короткое замыкание на землю', active: false }
			]
		  },
		  {
			id: '2.2',
			name: 'Фаза B',
			resistance: 0,
			voltagePresent: 220,
			groundContact: false,
			wireContact: false,
			malfunctions: [
			  { id: '221', name: 'Короткое замыкание с фазой C', active: false },
			  { id: '222', name: 'Короткое замыкание с фазой A', active: false },
			  { id: '223', name: 'Обрыв', active: false },
			  { id: '224', name: 'Короткое замыкание на землю', active: false }
			]
		  },
		  {
			id: '2.3',
			name: 'Фаза C',
			resistance: 0,
			voltagePresent: 220,
			groundContact: false,
			wireContact: false,
			malfunctions: [
			  { id: '231', name: 'Короткое замыкание с фазой A', active: false },
			  { id: '232', name: 'Короткое замыкание с фазой B', active: false },
			  { id: '233', name: 'Обрыв', active: false },
			  { id: '234', name: 'Короткое замыкание на землю', active: false }
			]
		  }
		]
	  },
	  {
		branches: [
		  {
			id: '3.1',
			name: 'Пускатель закрыть',
			resistance: 0,
			voltagePresent: 0,
			groundContact: false,
			wireContact: false,
			malfunctions: [
			  { id: '311', name: 'Неисправна катушка, пускатель не подтягивается', active: false },
			  { id: '312', name: 'Нет контакта в контактной группе', active: false },
			  { id: '313', name: 'Залипший контакт в контактной группе', active: false }
			]
		  },
		  {
			id: '3.2',
			name: 'Пускатель открыть',
			resistance: 0,
			voltagePresent: 0,
			groundContact: false,
			wireContact: false,
			malfunctions: [
			  { id: '321', name: 'Неисправна катушка, пускатель не подтягивается', active: false },
			  { id: '322', name: 'Нет контакта в контактной группе', active: false },
			  { id: '323', name: 'Залипший контакт в контактной группе', active: false }
			]
		  }
		]
	  },
	  {
		branches: [
		  {
			id: '4.1',
			name: 'Фаза A',
			resistance: 0,
			voltagePresent: 220,
			groundContact: false,
			wireContact: false,
			malfunctions: [
			  { id: '411', name: 'Короткое замыкание с фазой C', active: false },
			  { id: '412', name: 'Короткое замыкание с фазой B', active: false },
			  { id: '413', name: 'Обрыв', active: false },
			  { id: '414', name: 'Короткое замыкание на землю', active: false }
			]
		  },
		  {
			id: '4.2',
			name: 'Фаза B',
			resistance: 0,
			voltagePresent: 220,
			groundContact: false,
			wireContact: false,
			malfunctions: [
			  { id: '421', name: 'Короткое замыкание с фазой C', active: false },
			  { id: '422', name: 'Короткое замыкание с фазой A', active: false },
			  { id: '423', name: 'Обрыв', active: false },
			  { id: '424', name: 'Короткое замыкание на землю', active: false }
			]
		  },
		  {
			id: '4.3',
			name: 'Фаза C',
			resistance: 0,
			voltagePresent: 220,
			groundContact: false,
			wireContact: false,
			malfunctions: [
			  { id: '431', name: 'Короткое замыкание с фазой A', active: false },
			  { id: '432', name: 'Короткое замыкание с фазой B', active: false },
			  { id: '433', name: 'Обрыв', active: false },
			  { id: '434', name: 'Короткое замыкание на землю', active: false }
			]
		  }
		]
	  },
	  {
		id: '5',
		name: 'Электродвигатель задвижки',
		resistance: 0,
		voltagePresent: 0,
		groundContact: false,
		wireContact: false,
		malfunctions: [
		  { id: '501', name: 'Обрыв фазы', active: false },
		  { id: '502', name: 'Короткое замыкание между фазами', active: false },
		  { id: '503', name: 'Короткое замыкание обмотки на землю', active: false }
		]
	  }
	],
	controlCircuit: [
	  {
		id: '6',
		name: 'Автомат питания цепей управления',
		resistance: 0,
		voltagePresent: 0,
		groundContact: false,
		wireContact: false,
		malfunctions: [
		  { id: '601', name: 'Плохой контакт на клемме, нет фазы', active: false },
		  { id: '602', name: 'Ложно выбивает', active: false },
		  { id: '603', name: 'Собирается механически, но нет коммутации', active: false }
		]
	  },
	  {
		id: '7',
		name: 'Фаза А',
		resistance: 0,
		voltagePresent: 0,
		groundContact: false,
		wireContact: false,
		malfunctions: [
		  { id: '701', name: 'Обрыв провода', active: false },
		  { id: '702', name: 'Короткое замыкание на землю', active: false },
		  { id: '703', name: 'Короткое замыкание с проводом от фазы на концевой выключатель закрыто', active: false },
		  { id: '704', name: 'Короткое замыкание с проводом фазы двигателя', active: false }
		]
	  },
	  {
		branches: [
		  {
			branches: [
			  {
				id: '8.1.1',
				name: 'Концевой выключатель открыто',
				resistance: 0,
				voltagePresent: 0,
				groundContact: false,
				wireContact: false,
				malfunctions: [
				  { id: '801', name: 'Залипший контакт', active: false },
				  { id: '802', name: 'Нет контакта', active: false },
				  { id: '803', name: 'Не настроен', active: false }
				]
			  },
			  {
				id: '8.1.2',
				name: 'Провод концевого выключателя открыто до клемника КРУЗА-П',
				resistance: 0,
				voltagePresent: 0,
				groundContact: false,
				wireContact: false,
				malfunctions: [
				  { id: '901', name: 'Обрыв провода', active: false },
				  { id: '902', name: 'Короткое замыкание на землю', active: false },
				  { id: '903', name: 'Короткое замыкание с проводом концевого выключателя закрыто до клемника КРУЗА-П', active: false },
				  { id: '904', name: 'Короткое замыкание с проводом фазы двигателя', active: false }
				]
			  },
			  {
				branches: [
				  {
					id: '8.1.3.1',
					name: 'Вставка NDI (сигнал «не открыто»)',
					resistance: 0,
					voltagePresent: 0,
					groundContact: false,
					wireContact: false,
					malfunctions: [
					  { id: '1001', name: 'Нет контакта, сигнал не проходит', active: false },
					  { id: '1002', name: 'Ложно сработанная, сигнал не снимается', active: false }
					]
				  },
				  {
					branches: [
					  {
						branches: [
						  {
							id: '11',
							name: 'Вставка NDI (команда открыть с ПТК)',
							resistance: 0,
							voltagePresent: 0,
							groundContact: false,
							wireContact: false,
							malfunctions: [
							  { id: '1101', name: 'Нет контакта, команда не уходит', active: false },
							  { id: '1102', name: 'Ложно сработанная, команда постоянно висит', active: false }
							]
						  },
						  {
							id: '12',
							name: 'Кнопка КРУЗА-П (команда открыть с КРУЗА-П)',
							resistance: 0,
							voltagePresent: 0,
							groundContact: false,
							wireContact: false,
							malfunctions: [
							  { id: '1201', name: 'Нет контакта, команда не уходит', active: false },
							  { id: '1202', name: 'Ложно сработанная, команда постоянно висит', active: false }
							]
						  }
						]
					  },
					  {
						id: '13',
						name: 'Блокировка включения пускателя открыть',
						resistance: 0,
						voltagePresent: 0,
						groundContact: false,
						wireContact: false,
						malfunctions: [
						  { id: '1301', name: 'Нет контакта', active: false },
						  { id: '1302', name: 'Ложно сработанный контакт', active: false }
						]
					  },
					  {
						id: '14',
						name: 'Катушка пускателя открыть',
						resistance: 0,
						voltagePresent: 0,
						groundContact: false,
						wireContact: false,
						malfunctions: [
						  { id: '1401', name: 'Неисправна катушка, пускатель не подтягивается', active: false }
						]
					  }
					]
				  },
				  {
					id: '15',
					name: 'Лампа в КРУЗА-П закрыто',
					resistance: 0,
					voltagePresent: 0,
					groundContact: false,
					wireContact: false,
					malfunctions: [
					  { id: '1501', name: 'Перегорела', active: false }
					]
				  }
				]
			  }
			]
		  },
		  {
			branches: [
			  {
				id: '16',
				name: 'Концевой выключатель закрыто',
				resistance: 0,
				voltagePresent: 0,
				groundContact: false,
				wireContact: false,
				malfunctions: [
				  { id: '1601', name: 'Залипший контакт', active: false },
				  { id: '1602', name: 'Нет контакта', active: false },
				  { id: '1603', name: 'Не настроен', active: false }
				]
			  },
			  {
				id: '17',
				name: 'Провод концевого выключателя закрыто до клемника КРУЗА-П',
				resistance: 0,
				voltagePresent: 0,
				groundContact: false,
				wireContact: false,
				malfunctions: [
				  { id: '1701', name: 'Обрыв провода', active: false },
				  { id: '1702', name: 'Короткое замыкание на землю', active: false },
				  { id: '1703', name: 'Короткое замыкание с проводом концевого выключателя открыто до клемника КРУЗА-П', active: false },
				  { id: '1704', name: 'Короткое замыкание с проводом фазы двигателя', active: false }
				]
			  },
			  {
				branches: [
				  {
					id: '18',
					name: 'Вставка NDO (сигнал «не закрыто»)',
					resistance: 0,
					voltagePresent: 0,
					groundContact: false,
					wireContact: false,
					malfunctions: [
					  { id: '1801', name: 'Нет контакта, сигнал не проходит', active: false },
					  { id: '1802', name: 'Ложно сработанная, сигнал не снимается', active: false }
					]
				  },
				  {
					branches: [
					  {
						branches: [
						  {
							id: '19',
							name: 'Вставка NDI (команда закрыть с ПТК)',
							resistance: 0,
							voltagePresent: 0,
							groundContact: false,
							wireContact: false,
							malfunctions: [
							  { id: '1901', name: 'Нет контакта, команда не уходит', active: false },
							  { id: '1902', name: 'Ложно сработанная, команда постоянно висит', active: false }
							]
						  },
						  {
							id: '20',
							name: 'Кнопка КРУЗА-П (команда закрыть с КРУЗА-П)',
							resistance: 0,
							voltagePresent: 0,
							groundContact: false,
							wireContact: false,
							malfunctions: [
							  { id: '2001', name: 'Нет контакта, команда не уходит', active: false },
							  { id: '2002', name: 'Ложно сработанная, команда постоянно висит', active: false }
							]
						  }
						]
					  },
					  {
						id: '21',
						name: 'Блокировка включения пускателя закрыть',
						resistance: 0,
						voltagePresent: 0,
						groundContact: false,
						wireContact: false,
						malfunctions: [
						  { id: '2101', name: 'Нет контакта', active: false },
						  { id: '2102', name: 'Ложно сработанный контакт', active: false }
						]
					  },
					  {
						id: '22',
						name: 'Катушка пускателя закрыть',
						resistance: 0,
						voltagePresent: 0,
						groundContact: false,
						wireContact: false,
						malfunctions: [
						  { id: '2201', name: 'Неисправна катушка, пускатель не подтягивается', active: false }
						]
					  }
					]
				  },
				  {
					id: '23',
					name: 'Лампа в КРУЗА-П открыто',
					resistance: 0,
					voltagePresent: 0,
					groundContact: false,
					wireContact: false,
					malfunctions: [
					  { id: '2301', name: 'Перегорела', active: false }
					]
				  }
				]
			  }
			]
		  }
		]
	  }
	]
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
