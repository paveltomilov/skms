/**
 * Структура controlCircuit — массив с вложенными подмассивами (ветвлениями).
 * Аналогично powerCircuit: вложенный массив = параллельное ветвление.
 * Импортированные переменные — camelCase русские названия элементов.
 */

import { CircuitBranch } from '../../types/scheme';
import {
	provodOtSilovojChastiSkhemyKAvtomatuPitaniyaUpravleniya,
	avtomatPitaniyaSkhemyUpravleniya,
	provodFazyPosleAvtomata,
	provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaOtkryto,
	kontsevojVyklyuchatelOtkryto,
	provodOtKontsevogoVyklyuchatelyaOtkrytoDoKlemmikaKRUZAP2,
	vstavkaNDI_signalNeOtkryto,
	vstavkaNDI_signalNeOtkryto_element,
	provodOtVstavkiNDI_signalNeOtkrytoDoNejtrali,
	provodPeredVstavkojNDI_komandaOtkrytSPTK,
	vstavkaNDI_komandaOtkrytSPTK,
	provodOtVstavkiNDI_komandaOtkrytSPTKDoNejtrali,
	knopkaKRUZAP_komandaOtkryt,
	provodOtKnopkiKRUZAP_komandaOtkrytDoNejtrali,
	blokirovkaVklyucheniaPuskatelyaNaOtkrytie,
	katushkaPuskatelyaOtkryt,
	lampaVKRUZAP_zakryto,
	provodOtLampyVKRUZAP_zakrytoDoNejtrali,
	provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaZakryto,
	kontsevojVyklyuchatelZakryto,
	provodOtKontsevogoVyklyuchatelyaZakrytoDoKlemmikaKRUZAP2,
	provodPeredVstavkojNDI_signalNeZakryto,
	vstavkaNDI_signalNeZakryto,
	provodOtVstavkiNDI_signalNeZakrytoDoNejtrali,
	provodPeredVstavkojNDI_komandaZakrytSPTK,
	vstavkaNDI_komandaZakrytSPTK,
	provodOtVstavkiNDI_komandaZakrytSPTKDoNejtrali,
	knopkaKRUZAP_komandaZakryt,
	provodOtKnopkiKRUZAP_komandaZakrytDoNejtrali,
	blokirovkaVklyucheniaPuskatelyaNaZakrytie,
	katushkaPuskatelyaZakryt,
	lampaVKRUZAP_otkryto,
	provodOtLampyVKRUZAP_otkrytoDoNejtrali,
} from './controlCircuit.elements';

export const controlCircuit: CircuitBranch[] = [
	// Общая часть
	provodOtSilovojChastiSkhemyKAvtomatuPitaniyaUpravleniya,
	avtomatPitaniyaSkhemyUpravleniya,
	provodFazyPosleAvtomata,
	[
		// Параллельное ветвление: ветка ОТКРЫТЬ и ветка ЗАКРЫТЬ
		[
			// Ветка ОТКРЫТЬ (c.3.0.*)
			provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaOtkryto,
			kontsevojVyklyuchatelOtkryto,
			provodOtKontsevogoVyklyuchatelyaOtkrytoDoKlemmikaKRUZAP2,
			[
				// Параллельные подветки от клеммника КРУЗА-П (ветка открыть)
				// 1) Вставка NDI «не открыто»: провод -> вставка -> нейтраль
				[
					vstavkaNDI_signalNeOtkryto,
					vstavkaNDI_signalNeOtkryto_element,
					provodOtVstavkiNDI_signalNeOtkrytoDoNejtrali,
				],
				// 2) Команда открыть с ПТК: вставка -> блокировка -> катушка -> (провод к нейтрали)
				[
					provodPeredVstavkojNDI_komandaOtkrytSPTK,
					vstavkaNDI_komandaOtkrytSPTK,
					blokirovkaVklyucheniaPuskatelyaNaOtkrytie,
					katushkaPuskatelyaOtkryt,
					provodOtVstavkiNDI_komandaOtkrytSPTKDoNejtrali,
				],
				// 3) Кнопка КРУЗА-П «открыть»: кнопка -> нейтраль
				[
					knopkaKRUZAP_komandaOtkryt,
					provodOtKnopkiKRUZAP_komandaOtkrytDoNejtrali,
				],
				// 4) Лампа «закрыто»: лампа -> нейтраль
				[lampaVKRUZAP_zakryto, provodOtLampyVKRUZAP_zakrytoDoNejtrali],
			],
		],
		[
			// Ветка ЗАКРЫТЬ (c.3.1.*)
			provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaZakryto,
			kontsevojVyklyuchatelZakryto,
			provodOtKontsevogoVyklyuchatelyaZakrytoDoKlemmikaKRUZAP2,
			[
				// Параллельные подветки от клеммника КРУЗА-П (ветка закрыть)
				// 1) Вставка NDI «не закрыто»: провод -> вставка -> нейтраль
				[
					provodPeredVstavkojNDI_signalNeZakryto,
					vstavkaNDI_signalNeZakryto,
					provodOtVstavkiNDI_signalNeZakrytoDoNejtrali,
				],
				// 2) Команда закрыть с ПТК: вставка -> блокировка -> катушка -> (провод к нейтрали)
				[
					provodPeredVstavkojNDI_komandaZakrytSPTK,
					vstavkaNDI_komandaZakrytSPTK,
					blokirovkaVklyucheniaPuskatelyaNaZakrytie,
					katushkaPuskatelyaZakryt,
					provodOtVstavkiNDI_komandaZakrytSPTKDoNejtrali,
				],
				// 3) Кнопка КРУЗА-П «закрыть»: кнопка -> нейтраль
				[
					knopkaKRUZAP_komandaZakryt,
					provodOtKnopkiKRUZAP_komandaZakrytDoNejtrali,
				],
				// 4) Лампа «открыто»: лампа -> нейтраль
				[lampaVKRUZAP_otkryto, provodOtLampyVKRUZAP_otkrytoDoNejtrali],
			],
		],
	],
];
