import type { Modifier } from '@dnd-kit/core';

/* export const restrictToSchemeContainer: Modifier = ({
	transform,
	containerNodeRect,
	draggingNodeRect,
}) => {
	if (!containerNodeRect || !draggingNodeRect) {
		return transform;
	}
	const minX = -1450;
	const minY = -400;
	const maxX = containerNodeRect.width - draggingNodeRect.width - 210;
	const maxY = containerNodeRect.height - draggingNodeRect.height - 120;

	console.log(Math.max(minX, Math.min(transform.x, maxX)));

	console.log(Math.max(minY, Math.min(transform.y, maxY)));

	return {
		...transform,
		x: Math.max(minX, Math.min(transform.x, maxX)),
		y: Math.max(minY, Math.min(transform.y, maxY)),
	};
}; */

export const restrictToSchemeContainer: Modifier = ({
	transform,
	containerNodeRect,
	draggingNodeRect,
	active,
}) => {
	if (!containerNodeRect || !draggingNodeRect) {
		return transform;
	}

	// Разница в высоте между красным и черным щупом (91px)
	const redProbeOffset = active!.id === 'red' ? 91 : 0;

	// Границы области перемещения
	const minX = -1450;
	const maxX = containerNodeRect.width - draggingNodeRect.width - 210;

	// Корректируем вертикальные границы с учетом смещения красного щупа
	const minY = -360 - redProbeOffset;
	const maxY =
		containerNodeRect.height - draggingNodeRect.height - redProbeOffset - 5;

	return {
		...transform,
		x: Math.max(minX, Math.min(transform.x, maxX)),
		y: Math.max(minY, Math.min(transform.y, maxY)),
	};
};
