import { useCallback, useEffect } from 'react';

export const useKeydown = (code: string, handler: () => void) => {
  const handleKeydown = useCallback((event: KeyboardEvent) => {
    if (event.key === code) handler();
  }, [code, handler]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown, false);

    return () => {
      document.removeEventListener('keydown', handleKeydown, false);
    };
  }, [handleKeydown]);
};
