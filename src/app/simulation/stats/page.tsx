'use client';

import { FC } from 'react';

interface StatsPageProps {
	params: {
		id: string;
	};
}

const StatsPage: FC<StatsPageProps> = ({ params }) => {
	return (
		<div style={{ padding: '40px', textAlign: 'center' }}>
			<h1>Статистика вашей сессии</h1>
			<p>ID симуляции: {params.id}</p>
		</div>
	);
};

export default StatsPage;

