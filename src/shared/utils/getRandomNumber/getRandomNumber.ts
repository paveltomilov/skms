export const getRandomNumber = (to: number, from: number): number => {
	const minValue = Math.min(to, from);
	const maxValue = Math.max(to, from);
	const randomNumber = Math.floor(
		Math.random() * (maxValue - minValue + 1) + minValue,
	);

	return randomNumber;
};
