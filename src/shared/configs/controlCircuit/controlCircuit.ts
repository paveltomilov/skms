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
	vstavkaNDO_signalNeOtkryto,
	vstavkaNDO_signalNeOtkryto_element,
	provodOtVstavkiNDO_signalNeOtkrytoDoNejtrali,
	provodPeredVstavkojNDO_komandaOtkrytSPTK,
	vstavkaNDO_komandaOtkrytSPTK,
	provodOtVstavkiNDO_komandaOtkrytSPTKDoNejtrali,
	knopkaKRUZAP_komandaOtkryt,
	provodOtKnopkiKRUZAP_komandaOtkrytDoNejtrali,
	blokirovkaVklyucheniaPuskatelyaNaOtkrytie,
	katushkaPuskatelyaOtkryt,
	lampaVKRUZAP_zakryto,
	provodOtLampyVKRUZAP_zakrytoDoNejtrali,
	provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaZakryto,
	kontsevojVyklyuchatelZakryto,
	provodOtKontsevogoVyklyuchatelyaZakrytoDoKlemmikaKRUZAP2,
	provodPeredVstavkojNDO_signalNeZakryto,
	vstavkaNDO_signalNeZakryto,
	provodOtVstavkiNDO_signalNeZakrytoDoNejtrali,
	provodPeredVstavkojNDO_komandaZakrytSPTK,
	vstavkaNDO_komandaZakrytSPTK,
	provodOtVstavkiNDO_komandaZakrytSPTKDoNejtrali,
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
				// 1) Вставка NDO «не открыто»: провод -> вставка -> нейтраль
				[
					vstavkaNDO_signalNeOtkryto,
					vstavkaNDO_signalNeOtkryto_element,
					provodOtVstavkiNDO_signalNeOtkrytoDoNejtrali,
				],
				// 2) Команда открыть с ПТК: вставка -> блокировка -> катушка -> (провод к нейтрали)
				[
					provodPeredVstavkojNDO_komandaOtkrytSPTK,
					vstavkaNDO_komandaOtkrytSPTK,
					blokirovkaVklyucheniaPuskatelyaNaOtkrytie,
					katushkaPuskatelyaOtkryt,
					provodOtVstavkiNDO_komandaOtkrytSPTKDoNejtrali,
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
				// 1) Вставка NDO «не закрыто»: провод -> вставка -> нейтраль
				[
					provodPeredVstavkojNDO_signalNeZakryto,
					vstavkaNDO_signalNeZakryto,
					provodOtVstavkiNDO_signalNeZakrytoDoNejtrali,
				],
				// 2) Команда закрыть с ПТК: вставка -> блокировка -> катушка -> (провод к нейтрали)
				[
					provodPeredVstavkojNDO_komandaZakrytSPTK,
					vstavkaNDO_komandaZakrytSPTK,
					blokirovkaVklyucheniaPuskatelyaNaZakrytie,
					katushkaPuskatelyaZakryt,
					provodOtVstavkiNDO_komandaZakrytSPTKDoNejtrali,
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
