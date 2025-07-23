export const getTubFill = (color: string, value: number, maxValue: number) => {
	// Рассчитываем процент заполнения (но не более 100%)
	const fillPercentage = Math.min((value / maxValue) * 100, 100);

	const colorHex =
		color === 'blue'
			? '#0BB4B4'
			: color === 'yellow'
			? '#FFFE05'
			: '#8F1313';

	// возвращаем строку для градиента
	return `linear-gradient(to top, ${colorHex} ${fillPercentage}%, transparent ${fillPercentage}%)`;
};
