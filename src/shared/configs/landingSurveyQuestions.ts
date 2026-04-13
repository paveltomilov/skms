import { ServerQuestion } from '@/shared/types/question';

/** Замороженный пример для сторибука/тестов; на лендинге вопросы берутся из API. */
const YES_CHOICE_ID = 1;
const NO_CHOICE_ID = 2;

const createYesNoQuestion = (
	id: number,
	text: string,
): ServerQuestion => ({
	id,
	text,
	question_type: 'choice',
	choices: [
		{ id: YES_CHOICE_ID, value: 'Да' },
		{ id: NO_CHOICE_ID, value: 'Нет' },
	],
});

export const LANDING_SURVEY_QUESTIONS: ServerQuestion[] = [
	createYesNoQuestion(
		1,
		'Используется ли у вас формализованная программа адаптации новых сотрудников?',
	),
	createYesNoQuestion(
		2,
		'Актуальна ли для вас задача снижения числа ошибок новичков в первые месяцы работы?',
	),
	createYesNoQuestion(
		3,
		'Нужен ли вам безопасный формат отработки нештатных сценариев без вмешательства в техпроцесс?',
	),
	createYesNoQuestion(
		4,
		'Важно ли сократить нагрузку на наставников при обучении сотрудников?',
	),
	createYesNoQuestion(
		5,
		'Интересен ли вам инструмент для оценки готовности сотрудника к самостоятельной работе?',
	),
	createYesNoQuestion(
		6,
		'Полезен ли для вас контроль прогресса обучения по единым критериям?',
	),
	createYesNoQuestion(
		7,
		'Есть ли у вас потребность в регулярном тренинге действующих сотрудников?',
	),
	createYesNoQuestion(
		8,
		'Важно ли фиксировать типовые ошибки и работать с ними системно?',
	),
	createYesNoQuestion(
		9,
		'Рассматриваете ли вы цифровой тренажер как часть корпоративного обучения?',
	),
	createYesNoQuestion(
		10,
		'Готовы ли вы рассмотреть пилотный запуск на ограниченной группе сотрудников?',
	),
];
