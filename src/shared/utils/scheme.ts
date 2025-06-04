import { CircuitElement, InitialState } from '@/shared/types/scheme';

export const findElementByID = (id: string, state: InitialState) => {
	// проверяем что id соответсвует корректной длине
	if (id.length < 3 || id.length > 14) {
		throw new Error('id has wrong length');
	}

	// проверяем что id является строкой
	if (typeof id !== 'string') {
		throw new Error('ID must be a string');
	}

	// проверяем что id начинается с верной буквы
	if (!(id.startsWith('c') || id.startsWith('p'))) {
		throw new Error('id starts with wrong letter');
	}
	// получаем их id массив без точек
	const path = id.split('.');

	// по первому элементу массива определяем в какой ветке продолжать поиск нужного элемента схемы
	const branch = path[0] === 'p' ? state.powerCircuit : state.controlCircuit;

	// в результат записывыем 1 уровень вложенности элементов схемы
	let res = branch[parseInt(path[1], 10) - 1]; // parseInt(path[1], 10) - приведение к number (тк path - массив строк), - 1 тк в индексы массива начинаются с 0, а в id с 1

	// начинаем итерироваться со 2 уровня вложенности
	for (let i = 2; i < path.length; i++) {
		// проверка на массив, тк в state хранятся и массивы и объекты
		if (Array.isArray(res)) {
			res = res[parseInt(path[i], 10) - 1];
		} else {
			// когда res не массив, выходим из цикла
			break;
		}
	}

	if (!res) {
		throw new Error(`Element with id "${id}" not found`);
	}

	return res as CircuitElement;
};

function calcPoint(
	idPreviousPoint: boolean,
	scheme: InitialState,
	idElement: string,
): boolean {
	const element = findElementByID(idElement, scheme);
	if (idPreviousPoint === true && element.resistance < 1000000) {
		return true;
	} else {
		return false;
	}
}

export function setNewVoltagePoints(
	scheme: InitialState,
	points: Record<string, boolean>,
	setVoltagePoints: (points: Record<string, boolean>) => void,
): Record<string, boolean> {
	const pointsAcc = JSON.parse(JSON.stringify(points)) as Record<
		string,
		boolean
	>;

	pointsAcc['p.c.1'] = calcPoint(pointsAcc['p.c.0'], scheme, 'c.1');

	pointsAcc['p.c.2'] = calcPoint(pointsAcc['p.c.1'], scheme, 'c.2');

	pointsAcc['p.с.3.1.1'] = calcPoint(pointsAcc['p.c.2'], scheme, 'c.3.1.1');

	pointsAcc['p.с.3.1.2'] = calcPoint(
		pointsAcc['p.с.3.1.1'],
		scheme,
		'c.3.1.2',
	);

	pointsAcc['p.с.3.1.3.2.1'] =
		calcPoint(pointsAcc['p.с.3.1.2'], scheme, 'c.3.1.3.2.1.1') ||
		calcPoint(pointsAcc['p.с.3.1.2'], scheme, 'c.3.1.3.2.1.2');

	pointsAcc['p.с.3.1.3.2.2'] = calcPoint(
		pointsAcc['p.с.3.1.3.2.1'],
		scheme,
		'c.3.1.3.2.2',
	);

	pointsAcc['p.с.3.2.1'] = calcPoint(pointsAcc['p.c.2'], scheme, 'c.3.2.1');

	pointsAcc['p.с.3.2.2'] = calcPoint(
		pointsAcc['p.с.3.2.1'],
		scheme,
		'c.3.2.2',
	);

	pointsAcc['p.с.3.2.3.2.1'] =
		calcPoint(pointsAcc['p.с.3.2.2'], scheme, 'c.3.2.3.2.1.1') ||
		calcPoint(pointsAcc['p.с.3.2.2'], scheme, 'c.3.2.3.2.1.2');

	pointsAcc['p.с.3.2.3.2.2'] = calcPoint(
		pointsAcc['p.с.3.2.3.2.1'],
		scheme,
		'c.3.2.3.2.2',
	);

	setVoltagePoints(pointsAcc);
	return pointsAcc;
}
