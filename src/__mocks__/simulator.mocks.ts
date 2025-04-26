import { PointData } from '@/shared/types/simulator';

export const MOCK_CONNECTION_POINTS: PointData[] = [
	{ id: 'mock-point-power-in', label: 'Вход Пит.', position: { top: '10%', left: '10%' } },
	{ id: 'mock-point-motor-a', label: 'Двиг. А', position: { top: '30%', left: '80%' } },
	{ id: 'mock-point-control-1', label: 'Упр. 1', position: { top: '60%', left: '10%' } },
	{ id: 'mock-point-neutral', label: 'Ноль', position: { top: '80%', left: '80%' } },
	{ id: 'mock-point-ground', label: 'Земля', position: { top: '90%', left: '50%' } },
];