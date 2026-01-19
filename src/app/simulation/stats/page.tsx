'use client';

import { FC } from 'react';
import { useParams } from 'next/navigation';

const StatsPage: FC = () => {
	const params = useParams();
	const id = params?.id as string | undefined;

	return (
		<div style={{ padding: '40px', textAlign: 'center' }}>
			<h1>Статистика вашей сессии</h1>
			<p>ID симуляции: {id || 'не указан'}</p>
		</div>
	);
};

export default StatsPage;
