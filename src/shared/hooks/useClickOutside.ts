import { RefObject, useEffect } from 'react';

export const useClickOutside = (
	refs: RefObject<HTMLElement | null>[],
	handler: () => void
) => {
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent) => {
			const target = event.target as HTMLElement;
			
			// Проверяем наличие класса, который игнорирует закрытие
			if (target.closest('.ignore-click-outside')) {
				return;
			}
			
			const isOutsideAll = refs.every(ref => 
				!ref.current || !ref.current.contains(target)
			);
			
			if (isOutsideAll) {
				handler();
			}
		};

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [refs, handler]);
};