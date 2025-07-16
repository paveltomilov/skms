import { useEffect, useState } from 'react';

export const useDate = () => {
	const [currentTime, setCurrentTime] = useState(new Date());
	const [currentDate, setCurrentDate] = useState(new Date());

	useEffect(() => {
		// Обновление времени каждую секунду
		const timeInterval = setInterval(() => {
			const now = new Date();
			setCurrentTime(now);

			// Проверяем, изменилась ли дата (сравниваем день месяца)
			if (now.getDate() !== currentDate.getDate()) {
				setCurrentDate(now);
			}
		}, 1000);

		return () => {
			clearInterval(timeInterval);
		};
	}, [currentDate]);

	// Форматирование даты и времени
	const formattedDate = currentDate.toLocaleDateString('ru-RU', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	const formattedTime = currentTime.toLocaleTimeString('ru-RU');

	// для атрибута dateTime
	const dateTimeDate = currentDate.toISOString().split('T')[0];
	const dateTimeTime = currentTime.toISOString();

	return { formattedDate, formattedTime, dateTimeDate, dateTimeTime };
};
