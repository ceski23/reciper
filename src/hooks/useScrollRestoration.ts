import QuickLRU from 'quick-lru';
import {
  useCallback, useEffect, useLayoutEffect, useRef,
} from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollRestoration = <T extends HTMLElement>(autoRestore = false) => {
  const scrollPositions = useRef(new QuickLRU<string, number>({ maxSize: 10 }));
  const scrollContainer = useRef<T>(null);
  const currentLocation = useLocation();
  const previousLocation = useRef(currentLocation);

  const restoreScroll = useCallback((key: string) => {
    const savedScrollPosition = scrollPositions.current.get(key) ?? 0;
    scrollContainer.current?.scrollTo({ top: savedScrollPosition });
  }, []);

  useLayoutEffect(() => {
    if (autoRestore) restoreScroll(currentLocation.key);
  }, [autoRestore, currentLocation.key, restoreScroll]);

  useEffect(() => {
    const currentScrollPosition = scrollContainer.current?.scrollTop ?? 0;
    scrollPositions.current.set(previousLocation.current.key, currentScrollPosition);

    previousLocation.current = currentLocation;
  }, [currentLocation]);

  return {
    ref: scrollContainer,
    restoreScroll,
  };
};
