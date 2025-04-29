import type { Modifier } from '@dnd-kit/core';

export const restrictToSchemeContainer: Modifier = ({
	transform,
	containerNodeRect,
	draggingNodeRect,
}) => {
	if (!containerNodeRect || !draggingNodeRect) {
		return transform;
	}
	const minX = -1450;
	const minY = -330;
	const maxX = containerNodeRect.width - draggingNodeRect.width - 210;
	const maxY = containerNodeRect.height - draggingNodeRect.height - 85;

	return {
		...transform,
		x: Math.max(minX, Math.min(transform.x, maxX)),
		y: Math.max(minY, Math.min(transform.y, maxY)),
	};
};
