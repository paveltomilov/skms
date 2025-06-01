import { CircuitElement, InitialState } from '@/shared/types/scheme';
import { useAppSelector } from '@/shared/hooks/store';

export const findElementByID = (id: string, state: InitialState) => {
	// получаем их id массив без точек
	const path = id.split('.');

	// по первому элементу массива определяем в какой ветке продолжать поиск нужного элемента схемы
	const branch = path[0] === 'p' ? state.powerCircuit : state.controlCircuit;

	// в результат записывыем 1 уровень вложенности элементов схемы
	let res = branch[+path[1] - 1]; // +path - приведение к number (тк path - массив строк), - 1 тк в индексы массива начинаются с 0, а в id с 1

	// начинаем итерироваться со 2 уровня вложенности
	for (let i = 2; i < path.length; i++) {
		// проверка на массив, тк в state хранятся и массивы и объекты
		if (Array.isArray(res)) {
			res = res[+path[i] - 1];
		} else {
			// когда res не массив, выходим из цикла
			break;
		}
	}
	return res as CircuitElement;
};

export function setVoltagePoints(
	scheme: InitialState,
	points: Record<string, boolean>,
) {
	let pointsAcc = JSON.parse(JSON.stringify(points));
	let element = scheme.controlCircuit[0] as CircuitElement; // Принудительно говорим TypeScript'у, что это CircuitElement

	if (pointsAcc['p.c.0'] === true && element.resistance < 1000000) {
		pointsAcc['p.c.1'] = true;
	} else {
		pointsAcc['p.c.1'] = false;
	}
	element = scheme.controlCircuit[1] as CircuitElement;

	if (pointsAcc['p.c.1'] === true && element.resistance < 1000000) {
		pointsAcc['p.c.2'] = true;
	} else {
		pointsAcc['p.c.2'] = false;
	}
	element = scheme.controlCircuit[3] as CircuitElement;

	if (pointsAcc['p.c.2'] === true && element.resistance < 1000000) {
		pointsAcc['p.c.3'] = true;
	} else {
		pointsAcc['p.c.3'] = false;
	}
}
