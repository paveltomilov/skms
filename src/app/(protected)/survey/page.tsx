'use client';

import { FC } from 'react';
import { useSearchParams } from 'next/navigation';

const SurveyPage: FC = () => {
	const searchParams = useSearchParams();
	const simulationId = searchParams.get('id');

	return (
		<div style={{ padding: '40px', textAlign: 'center' }}>
			<h1>Опрос завершён. Спасибо!</h1>
			{simulationId && <p>ID симуляции: {simulationId}</p>}
		</div>
	);
};

export default SurveyPage;
