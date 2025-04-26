export const PROBE_TIP_OFFSETS = {
	x: 12,
	y: 4,
};

export const DEFAULT_PROBE_POSITIONS = {
	red: { top: '115px', left: '495px' },
	black: { top: '25px', left: '495px' },
};

export enum DndItemType {
	PROBE = 'probe',
	NODE = 'node',
}

export const BODY_DRAGGING_CLASS = 'sim-env-dragging';

export const Z_INDEX = {
	DEFAULT_PROBE: 5,
	CONNECTED_PROBE: 10,
	DRAGGING: 1,
	DRAG_OVERLAY: 1000,
};

export const ACCEPTABLE_NODE_TYPES = [DndItemType.PROBE]; 