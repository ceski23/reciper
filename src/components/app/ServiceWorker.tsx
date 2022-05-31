import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { ToastWithButton } from 'components/common/ToastWithButton';

import * as serviceWorkerRegistration from 'utils/serviceWorkerRegistration';

export const ServiceWorker = () => {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  const handleUpdate = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    window.location.replace(window.location.href);
  };

  const onSWUpdate = (registration: ServiceWorkerRegistration) => {
    toast('Aktualizacja aplikacji jest dostępna. Nowa wersja zostanie użyta przy następnym uruchomieniu aplikacji', {
      duration: Infinity,
    });

    setWaitingWorker(registration.waiting);
  };

  useEffect(() => {
    serviceWorkerRegistration.register({ onUpdate: onSWUpdate });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
