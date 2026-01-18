'use client';

import { FC } from 'react';
import { useParams } from 'next/navigation';

const SurveyPage: FC = () => {
	const params = useParams();
	const id = params?.id as string | undefined;

	return (
		<div style={{ padding: '40px', textAlign: 'center' }}>
			<h1>Опрос завершён. Спасибо!</h1>
			<p>ID симуляции: {id || 'не указан'}</p>
		</div>
	);
};

export default SurveyPage;

