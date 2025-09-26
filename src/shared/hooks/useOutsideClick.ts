import { useEffect, useRef } from 'react';

export const useOutsideClick = (onOutsideClick: () => void) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
                onOutsideClick();
            }
        }

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [onOutsideClick]);

    return ref;
};

