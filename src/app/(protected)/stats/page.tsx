'use client';

import { FC } from 'react';
import { useAppSelector } from '@/shared/hooks/store';

const StatsPage: FC = () => {
	const simulationId = useAppSelector(state => state.simulation.simulationId);

	return (
		<div style={{ padding: '40px', textAlign: 'center' }}>
			<h1>Статистика вашей сессии</h1>
			{simulationId && <p>ID симуляции: {simulationId}</p>}
		</div>
	);
};

export default StatsPage;
