export const getTubFill = (
	color: string,
	value: number,
	minValue: number,
	maxValue: number,
) => {
	// Рассчитываем процент заполнения с учётом отрицательных значений
	const safeValue = Math.max(value, minValue); // Не опускаемся ниже minValue
	const fillPercentage =
		((safeValue - minValue) / (maxValue - minValue)) * 100;

	const colorHex =
		color === 'blue'
			? '#0BB4B4'
			: color === 'yellow'
			? '#FFFE05'
			: '#8F1313';

	// возвращаем строку для градиента
	return `linear-gradient(to top, ${colorHex} ${fillPercentage}%, transparent ${fillPercentage}%)`;
};
