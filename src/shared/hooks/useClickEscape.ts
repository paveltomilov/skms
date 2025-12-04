import { RefObject, useEffect } from 'react';

export const useClickEscape = (
	ref: RefObject<HTMLDivElement | null>,
	refChildren: RefObject<HTMLDivElement | null>,
	handler: () => void,
) => {
	useEffect(() => {
		const listener = (event: KeyboardEvent) => {
			// Обработка Escape
			if (event.type === 'keydown') {
				if ((event as KeyboardEvent).key === 'Escape') {
					handler();
					return;
				}
				return;
			}
		};
		document.addEventListener('keydown', listener);

		return () => {
			document.removeEventListener('keydown', listener);
		};
	}, [ref, refChildren, handler]);
};
