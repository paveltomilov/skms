import React from 'react';
import { render, screen } from '@testing-library/react';
import LampScheme from '../index';
import type { LampIndicatorColor } from '@/shared/types/icon';

jest.mock('@/shared/UI/LampIndicator', () => ({
	__esModule: true,
	default: ({ color }: { color: LampIndicatorColor }) => (
		<div data-testid="lamp-indicator" data-color={color} />
	),
}));

const mockUseAppSelector = jest.fn();
const mockDispatch = jest.fn();
jest.mock('@/shared/hooks/store', () => ({
	useAppSelector: (selector: typeof mockUseAppSelector) => mockUseAppSelector(selector),
	useAppDispatch: () => mockDispatch,
}));

jest.mock('@/shared/UI/Marker', () => ({
	__esModule: true,
	default: ({ text }: { text: string }) => <span data-marker={text} />,
}));

jest.mock('@/shared/UI/icons/Channel', () => ({
	__esModule: true,
	default: ({ className }: { className?: string }) => <div data-channel className={className} />,
}));

jest.mock('@/shared/UI/ScrewConnection', () => ({
	__esModule: true,
	default: ({ pointId }: { pointId: string }) => <div data-screw={pointId} />,
}));

jest.mock('@/shared/UI/icons/ProvodLine', () => ({
	__esModule: true,
	default: () => <div data-provod />,
}));

const mockFindElementByID = jest.fn();
jest.mock('@/shared/utils/findElementByID/scheme', () => ({
	findElementByID: (...args: unknown[]) => mockFindElementByID(...args),
}));

import {
	CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID,
	KRUZAP_CLOSED_STATUS_LAMP_ID,
	KRUZAP_OPEN_STATUS_LAMP_ID,
	OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID,
} from '@/shared/constants';

const CLOSED_POINT_ID = CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID;
const OPEN_POINT_ID = OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID;
const CLOSED_ELEMENT_ID = KRUZAP_CLOSED_STATUS_LAMP_ID;
const OPEN_ELEMENT_ID = KRUZAP_OPEN_STATUS_LAMP_ID;

type PointValue = boolean | { state?: boolean } | undefined;

const renderLampScheme = (
	points: Record<string, PointValue>,
	resistances: Record<string, number> = {},
) => {
	mockUseAppSelector.mockImplementation(selector =>
		selector({
			points,
			circuit: {},
		}),
	);

	mockFindElementByID.mockImplementation((id: string) => ({
		resistance: resistances[id] ?? 100,
	}));

	render(<LampScheme />);

	return screen
		.getAllByTestId('lamp-indicator')
		.map(el => el.getAttribute('data-color'));
};

describe('LampScheme', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('выключает обе лампы без питания', () => {
		const colors = renderLampScheme({
			[CLOSED_POINT_ID]: false,
			[OPEN_POINT_ID]: false,
		});

		expect(colors).toEqual(['lamp_white_off', 'lamp_green_off']);
	});

	it('включает только индикатор закрыто при питании ветки закрытия', () => {
		const colors = renderLampScheme({
			[CLOSED_POINT_ID]: true,
			[OPEN_POINT_ID]: false,
		});

		expect(colors).toEqual(['lamp_white_on', 'lamp_green_off']);
	});

	it('включает только индикатор открыто при питании ветки открытия', () => {
		const colors = renderLampScheme({
			[CLOSED_POINT_ID]: false,
			[OPEN_POINT_ID]: true,
		});

		expect(colors).toEqual(['lamp_white_off', 'lamp_green_on']);
	});

	it('включает обе лампы при питании обеих веток', () => {
		const colors = renderLampScheme({
			[CLOSED_POINT_ID]: true,
			[OPEN_POINT_ID]: true,
		});

		expect(colors).toEqual(['lamp_white_on', 'lamp_green_on']);
	});

	it('гасит белую лампу закрыто при высоком сопротивлении её цепи', () => {
		const colors = renderLampScheme(
			{
				[CLOSED_POINT_ID]: true,
				[OPEN_POINT_ID]: true,
			},
			{
				[CLOSED_ELEMENT_ID]: 1_000_000_000,
				[OPEN_ELEMENT_ID]: 100,
			},
		);

		expect(colors).toEqual(['lamp_white_off', 'lamp_green_on']);
	});
});
