'use client';

import { FC } from 'react';
import { useSearchParams } from 'next/navigation';

const StatsPage: FC = () => {
	const searchParams = useSearchParams();
	const simulationId = searchParams.get('id');

	return (
		<div style={{ padding: '40px', textAlign: 'center' }}>
			<h1>Статистика вашей сессии</h1>
			{simulationId && <p>ID симуляции: {simulationId}</p>}
		</div>
	);
};

export default StatsPage;
