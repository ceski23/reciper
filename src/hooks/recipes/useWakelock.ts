/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect } from 'react';
import { useWakeLock } from 'react-screen-wake-lock';

export const useWakelock = () => {
  const wakelock = useWakeLock();

  useEffect(() => {
    if (wakelock.isSupported) wakelock.request('screen');
    return () => {
      if (wakelock.isSupported) wakelock.release();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
