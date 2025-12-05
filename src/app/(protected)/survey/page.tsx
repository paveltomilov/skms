'use client';

import { FC } from 'react';
import { useAppSelector } from '@/shared/hooks/store';

const SurveyPage: FC = () => {
	const simulationId = useAppSelector(state => state.simulation.simulationId);

	return (
		<div style={{ padding: '40px', textAlign: 'center' }}>
			<h1>Опрос завершён. Спасибо!</h1>
			{simulationId && <p>ID симуляции: {simulationId}</p>}
		</div>
	);
};

export default SurveyPage;
