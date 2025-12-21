'use client';

import { FC } from 'react';

interface SurveyPageProps {
	params: {
		id: string;
	};
}

const SurveyPage: FC<SurveyPageProps> = ({ params }) => {
	return (
		<div style={{ padding: '40px', textAlign: 'center' }}>
			<h1>Опрос завершён. Спасибо!</h1>
			<p>ID симуляции: {params.id}</p>
		</div>
	);
};

export default SurveyPage;

