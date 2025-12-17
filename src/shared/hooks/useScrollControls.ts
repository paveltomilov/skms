'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import SimpleBarCore from 'simplebar-core';

interface UseScrollControlsProps {
    scrollPercentage?: number;
    scrollUpdateDelay?: number;
}

interface UseScrollControlsReturn {
    simplebarRef: React.RefObject<SimpleBarCore | null>;
    canScrollUp: boolean;
    canScrollDown: boolean;
    isScrollable: boolean;
    handleScrollUp: () => void;
    handleScrollDown: () => void;
    updateScrollButtons: () => void;
}

export const useScrollControls = ({
                                      scrollPercentage = 10,
                                      scrollUpdateDelay = 300
}: UseScrollControlsProps = {}): UseScrollControlsReturn => {
    const simplebarRef = useRef<SimpleBarCore | null>(null);
    const [canScrollUp, setCanScrollUp] = useState(false);
    const [canScrollDown, setCanScrollDown] = useState(false);
    const [isScrollable, setIsScrollable] = useState(false);

    const scrollElementRef = useRef<HTMLElement | null>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);


    const getScrollElement = useCallback(() => {
        if (!simplebarRef.current) return null;

        return simplebarRef.current.getScrollElement?.() as HTMLElement || null;
    }, []) ;

    const checkIfScrollable = useCallback(() => {
        const scrollElement = getScrollElement();
        if (!scrollElement) return false;

        const scrollable = scrollElement.scrollHeight > scrollElement.clientHeight;
        setIsScrollable(scrollable);

        return scrollable;
    }, [getScrollElement]);

    const updateScrollButtons = useCallback(() => {
        const scrollElement = getScrollElement();
        if (!scrollElement) return;

        const isCurrentlyScrollable = checkIfScrollable();

        if (!isCurrentlyScrollable) {
            setCanScrollUp(false);
            setCanScrollDown(false);
            return;
        }

        if (scrollElement) {
            const canUp = scrollElement.scrollTop > 0;
            const canDown = scrollElement.scrollTop <
                scrollElement.scrollHeight - scrollElement.clientHeight - 1;

            setCanScrollUp(canUp);
            setCanScrollDown(canDown);
        }
    }, [getScrollElement, checkIfScrollable]) ;

    const scrollByPercentage = useCallback((percentage: number) => {
        const scrollElement = getScrollElement();

        if (scrollElement && isScrollable) {
            const scrollAmount = (scrollElement.clientHeight * percentage) / 100;
            scrollElement.scrollBy({
                top: scrollAmount,
                behavior: 'smooth'
            });

            setTimeout(updateScrollButtons, scrollUpdateDelay);
        }
    }, [getScrollElement, isScrollable, updateScrollButtons, scrollUpdateDelay]) ;

    const handleScrollUp = useCallback(() => {
        scrollByPercentage(-scrollPercentage);
    }, [scrollByPercentage, scrollPercentage]);

    const handleScrollDown = useCallback(() => {
        scrollByPercentage(scrollPercentage);
    }, [scrollByPercentage, scrollPercentage]);

    useEffect(() => {
        let mounted = true;

        const initialize = () => {
            if (!mounted) return;

            const scrollElement = getScrollElement();
            if (!scrollElement) {
                setTimeout(initialize, 50);
                return;
            }

            scrollElementRef.current = scrollElement;

            scrollElement.addEventListener('scroll', updateScrollButtons);

            if (typeof ResizeObserver !== 'undefined') {
                resizeObserverRef.current = new ResizeObserver(() => {
                    requestAnimationFrame(() => {
                        checkIfScrollable();
                        updateScrollButtons();
                    });
                });
                resizeObserverRef.current.observe(scrollElement);
            }

            checkIfScrollable();
            updateScrollButtons();
        };

        const timer = setTimeout(initialize, 100);

        return () => {
            mounted = false;
            clearTimeout(timer);

            const scrollElement = scrollElementRef.current;
            if (scrollElement) {
                scrollElement.removeEventListener('scroll', updateScrollButtons);
            }

            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }
        };
    }, [getScrollElement, updateScrollButtons, checkIfScrollable]);

    return {
        simplebarRef,
        canScrollUp,
        canScrollDown,
        isScrollable,
        handleScrollUp,
        handleScrollDown,
        updateScrollButtons,
    };
};