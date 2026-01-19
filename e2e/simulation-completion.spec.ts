import { test, expect } from '@playwright/test';

test.describe('Завершение симуляции', () => {
	test.beforeEach(async ({ page }) => {
		// Мокаем localStorage для симуляции состояния
		await page.goto('/ptk');
		await page.evaluate(() => {
			localStorage.setItem(
				'persist:appWindows',
				JSON.stringify({
					simulation: JSON.stringify({
						simulationId: 'test-sim-123',
						originalMalfunctions: [
							{ id: 'm1', name: 'Неисправность 1', active: true },
							{ id: 'm2', name: 'Неисправность 2', active: true },
						],
						foundMalfunctionIds: [],
						isCompleted: false,
						isInitialized: true,
					}),
				}),
			);
		});
	});

	test('Сценарий A — успешное завершение → модал → переход на /stats или /survey', async ({
		page,
	}) => {
		// Настраиваем состояние: все неисправности найдены
		await page.evaluate(() => {
			const persisted = JSON.parse(
				localStorage.getItem('persist:appWindows') || '{}',
			);
			const simulation = JSON.parse(persisted.simulation || '{}');
			simulation.foundMalfunctionIds = ['m1', 'm2'];
			persisted.simulation = JSON.stringify(simulation);
			localStorage.setItem('persist:appWindows', JSON.stringify(persisted));
		});

		// Открываем страницу симуляции
		await page.goto('/ptk');

		// Ждем загрузки страницы
		await page.waitForLoadState('networkidle');

		// Ищем кнопку "Завершить" (может быть в модальном окне)
		// Для теста предполагаем, что модальное окно уже открыто или открывается
		const finishButton = page.getByRole('button', { name: /Завершить/i });

		// Если кнопка не видна, возможно нужно открыть модальное окно
		// В реальном сценарии это может быть через клик на другую кнопку
		if (!(await finishButton.isVisible())) {
			// Пытаемся найти способ открыть модальное окно симуляции
			// Это зависит от реальной реализации UI
			const setSimulationButton = page.getByRole('button', {
				name: /задать симуляцию/i,
			});
			if (await setSimulationButton.isVisible()) {
				await setSimulationButton.click();
				await page.waitForTimeout(500);
			}
		}

		// Кликаем на кнопку "Завершить"
		await finishButton.click();

		// Ждем появления модального окна завершения
		await page.waitForSelector('text=Поздравляем! Все неисправности успешно устранены.', {
			timeout: 5000,
		});

		// Проверяем, что модальное окно отображается
		const modalText = page.getByText(
			'Поздравляем! Все неисправности успешно устранены.',
		);
		await expect(modalText).toBeVisible();

		// Проверяем наличие кнопки в модальном окне
		// Кнопка может быть "Пройти опрос" или "Узнать результат" в зависимости от подписки
		const modalButton = page
			.getByRole('button', { name: /пройти опрос|узнать результат/i })
			.first();

		await expect(modalButton).toBeVisible();

		// Кликаем на кнопку в модальном окне
		await modalButton.click();

		// Проверяем переход на соответствующую страницу
		await page.waitForURL(/\/simulation\/.*\/(stats|survey)/, { timeout: 5000 });

		// Проверяем, что мы на правильной странице
		const url = page.url();
		expect(url).toMatch(/\/simulation\/.*\/(stats|survey)/);

		// Проверяем содержимое страницы
		if (url.includes('/stats')) {
			await expect(page.getByText('Статистика вашей сессии')).toBeVisible();
		} else if (url.includes('/survey')) {
			await expect(page.getByText('Опрос завершён. Спасибо!')).toBeVisible();
		}
	});

	test('Сценарий B — не все неисправности → появляется toast → остаёмся в симуляции', async ({
		page,
	}) => {
		// Настраиваем состояние: найдена только одна неисправность из двух
		await page.evaluate(() => {
			const persisted = JSON.parse(
				localStorage.getItem('persist:appWindows') || '{}',
			);
			const simulation = JSON.parse(persisted.simulation || '{}');
			simulation.foundMalfunctionIds = ['m1']; // Только одна из двух
			persisted.simulation = JSON.stringify(simulation);
			localStorage.setItem('persist:appWindows', JSON.stringify(persisted));
		});

		// Открываем страницу симуляции
		await page.goto('/ptk');
		await page.waitForLoadState('networkidle');

		// Ищем кнопку "Завершить"
		const finishButton = page.getByRole('button', { name: /Завершить/i });

		// Если кнопка не видна, пытаемся открыть модальное окно
		if (!(await finishButton.isVisible())) {
			const setSimulationButton = page.getByRole('button', {
				name: /задать симуляцию/i,
			});
			if (await setSimulationButton.isVisible()) {
				await setSimulationButton.click();
				await page.waitForTimeout(500);
			}
		}

		// Кликаем на кнопку "Завершить"
		await finishButton.click();

		// Ждем появления toast с сообщением о неполном решении
		await page.waitForSelector(
			'text=Найдены не все неисправности. Продолжите поиск.',
			{ timeout: 5000 },
		);

		// Проверяем, что toast отображается
		const toast = page.getByText(
			'Найдены не все неисправности. Продолжите поиск.',
		);
		await expect(toast).toBeVisible();

		// Проверяем, что мы остались на той же странице (не произошел переход)
		await page.waitForTimeout(1000);
		const url = page.url();
		expect(url).not.toMatch(/\/simulation\/.*\/(stats|survey)/);
		expect(url).toMatch(/\/ptk/);

		// Проверяем, что модальное окно завершения НЕ появилось
		const modalText = page.getByText(
			'Поздравляем! Все неисправности успешно устранены.',
		);
		await expect(modalText).not.toBeVisible();

		// Проверяем, что кнопка "Завершить" снова доступна (разблокирована)
		await page.waitForTimeout(1500); // Ждем разблокировки кнопки
		const finishButtonAfter = page.getByRole('button', { name: /Завершить/i });
		await expect(finishButtonAfter).not.toBeDisabled();
	});
});

