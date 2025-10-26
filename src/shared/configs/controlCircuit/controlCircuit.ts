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
	vstavkaNDI_komandaOtkrytSPTK,
	knopkaKRUZAP_komandaOtkryt,
	blokirovkaVklyucheniaPuskatelyaNaOtkrytie,
	katushkaPuskatelyaOtkryt,
	lampaVKRUZAP_zakryto,
	provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaZakryto,
	kontsevojVyklyuchatelZakryto,
	provodOtKontsevogoVyklyuchatelyaZakrytoDoKlemmikaKRUZAP2,
	vstavkaNDI_signalNeZakryto,
	vstavkaNDI_komandaZakrytSPTK,
	knopkaKRUZAP_komandaZakryt,
	blokirovkaVklyucheniaPuskatelyaNaZakrytie,
	katushkaPuskatelyaZakryt,
	lampaVKRUZAP_otkryto,
} from './controlCircuit.elements';

export const controlCircuit: CircuitBranch[] = [
	// Общая часть
	provodOtSilovojChastiSkhemyKAvtomatuPitaniyaUpravleniya,
	avtomatPitaniyaSkhemyUpravleniya,
	provodFazyPosleAvtomata,
	[
		// Параллельное ветвление: ветка ОТКРЫТЬ и ветка ЗАКРЫТЬ
		[
			// Ветка ОТКРЫТЬ (c.3.1.*)
			provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaOtkryto,
			kontsevojVyklyuchatelOtkryto,
			provodOtKontsevogoVyklyuchatelyaOtkrytoDoKlemmikaKRUZAP2,
			[
				// Параллельные подветки от клеммника КРУЗА-П (ветка открыть)
				vstavkaNDI_signalNeOtkryto,
				[
					vstavkaNDI_komandaOtkrytSPTK,
					blokirovkaVklyucheniaPuskatelyaNaOtkrytie,
					katushkaPuskatelyaOtkryt,
				],
				knopkaKRUZAP_komandaOtkryt,
				lampaVKRUZAP_zakryto,
			],
		],
		[
			// Ветка ЗАКРЫТЬ (c.3.2.*)
			provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaZakryto,
			kontsevojVyklyuchatelZakryto,
			provodOtKontsevogoVyklyuchatelyaZakrytoDoKlemmikaKRUZAP2,
			[
				// Параллельные подветки от клеммника КРУЗА-П (ветка закрыть)
				vstavkaNDI_signalNeZakryto,
				[
					vstavkaNDI_komandaZakrytSPTK,
					blokirovkaVklyucheniaPuskatelyaNaZakrytie,
					katushkaPuskatelyaZakryt,
				],
				knopkaKRUZAP_komandaZakryt,
				lampaVKRUZAP_otkryto,
			],
		],
	],
];
