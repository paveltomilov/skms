import { dispatchSimulationCommand } from './dispatchSimulationCommand';
import { createTickSnapshotFromPreset, gateControlPresets } from '../presets/gateControlPreset';

describe('dispatchSimulationCommand', () => {
	it('moves gate to open direction by tick', () => {
		const result = dispatchSimulationCommand({
			type: 'tick',
			payload: {
				direction: 'open',
				snapshot: createTickSnapshotFromPreset('ptk', 10, {
					hasMalfunctionStuckContactSwitchOpenElement: false,
					hasMalfunctionStuckContactSwitchCloseElement: false,
				}),
			},
		});

		expect(result.nextPosition).toBe(11);
		expect(result.shouldStop).toBe(false);
	});

	it('stops on boundary without stuck malfunction', () => {
		const result = dispatchSimulationCommand({
			type: 'tick',
			payload: {
				direction: 'open',
				snapshot: createTickSnapshotFromPreset('kruzap', 99, {
					hasMalfunctionStuckContactSwitchOpenElement: false,
					hasMalfunctionStuckContactSwitchCloseElement: false,
				}),
			},
		});

		expect(result.nextPosition).toBe(100);
		expect(result.shouldStop).toBe(true);
		expect(result.shouldTriggerInputBreakerShutdownTimer).toBe(false);
	});

	it('triggers shutdown timer modifier on boundary with stuck malfunction', () => {
		const result = dispatchSimulationCommand({
			type: 'tick',
			payload: {
				direction: 'close',
				snapshot: createTickSnapshotFromPreset('ptk', 1, {
					hasMalfunctionStuckContactSwitchOpenElement: false,
					hasMalfunctionStuckContactSwitchCloseElement: true,
				}),
			},
		});

		expect(result.nextPosition).toBe(0);
		expect(result.shouldStop).toBe(false);
		expect(result.shouldTriggerInputBreakerShutdownTimer).toBe(true);
	});

	it('returns intermediate state for stop command', () => {
		const result = dispatchSimulationCommand({
			type: 'stop',
			payload: {
				snapshot: {
					currentPosition: 30,
					positionOpen: gateControlPresets.ptk.positionOpen,
					positionClose: gateControlPresets.ptk.positionClose,
					defaultLimitSwitchResistance:
						gateControlPresets.ptk.defaultLimitSwitchResistance,
					highResistance: gateControlPresets.ptk.highResistance,
					hasMalfunctionStuckContactSwitchOpenElement: false,
					hasMalfunctionStuckContactSwitchCloseElement: false,
				},
			},
		});

		expect(result.gateState).toBe('intermediate');
		expect(result.nextPosition).toBe(30);
		expect(result.shouldStop).toBe(true);
	});
});
