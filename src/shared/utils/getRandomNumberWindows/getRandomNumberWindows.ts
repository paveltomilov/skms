export const getRandomNumberWindows = (min: number, max: number): number => {
	const randomNumber = Math.random() * (max - min) + min;
	const moduleRandomNumber = Math.abs(randomNumber);

	if (moduleRandomNumber > 100 && moduleRandomNumber < 1000) {
		return Number(randomNumber.toFixed(1));
	}
	if (moduleRandomNumber > 10 && moduleRandomNumber < 100) {
		return Number(randomNumber.toFixed(2));
	}
	if (moduleRandomNumber > 0 && moduleRandomNumber < 10) {
		return Number(randomNumber.toFixed(3));
	}
	if (moduleRandomNumber === 0) {
		return min;
	}
	return Number(randomNumber.toFixed(0));
};
