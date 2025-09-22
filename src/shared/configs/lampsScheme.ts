import { MarkerName } from '../types/markers';

export const pins: { code: MarkerName }[] = [
	{ code: 'A' as const },
	{ code: 'N' as const },
];
export const columns = [
	{ title: 'Закрыто', color: 'white' as const },
	{ title: 'Открыто', color: 'lamp_green' as const },
];
