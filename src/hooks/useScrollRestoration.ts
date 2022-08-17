import QuickLRU from 'quick-lru';
import {
  useCallback, useEffect, useLayoutEffect, useRef,
} from 'react';
import { useLocation } from 'react-router';

import { history } from 'index';

export const useScrollRestoration = <T extends HTMLElement>(autoRestore = false) => {
  const scrollPositions = useRef(new QuickLRU<string, number>({ maxSize: 10 }));
  const scrollContainer = useRef<T>(null);
  const currentLocation = useLocation();

  const restoreScroll = useCallback((key: string) => {
    const savedScrollPosition = scrollPositions.current.get(key) ?? 0;
    scrollContainer.current?.scrollTo({ top: savedScrollPosition });
  }, []);

  useLayoutEffect(() => {
    if (autoRestore) restoreScroll(currentLocation.key);
  }, [autoRestore, currentLocation.key, restoreScroll]);

  useEffect(() => {
    const unlisten = history.listen(() => {
      const currentScrollPosition = scrollContainer.current?.scrollTop ?? 0;
      scrollPositions.current.set(currentLocation.key, currentScrollPosition);
    });

    return () => unlisten();
  }, [currentLocation.key]);

  return {
    ref: scrollContainer,
    restoreScroll,
  };
};
