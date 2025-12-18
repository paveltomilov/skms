'use client';

import { useEffect, RefObject } from 'react';

export const useArrowNavigation = (containerRef: RefObject<HTMLElement | null>) => {
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return; 

		const handleKeyDown = (event: KeyboardEvent) => {
			const items = Array.from(
				container.querySelectorAll<HTMLElement>('[role="option"]')
			);

			if (items.length === 0) return;

			const currentIndex = items.findIndex(
				item => item === document.activeElement
			);

			if (event.key === 'ArrowDown') {
				event.preventDefault();
				const nextIndex = (currentIndex + 1) % items.length;
				items[nextIndex]?.focus();
			} else if (event.key === 'ArrowUp') {
				event.preventDefault();
				const prevIndex = (currentIndex - 1 + items.length) % items.length;
				items[prevIndex]?.focus();
			}
		};

		const containerElement = containerRef.current;
		if (containerElement) {
			containerElement.addEventListener('keydown', handleKeyDown);
			return () => containerElement.removeEventListener('keydown', handleKeyDown);
		}
	}, [containerRef]);
};