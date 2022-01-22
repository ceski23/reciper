import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ToastWithButton } from 'components/ToastWithButton';
import * as serviceWorkerRegistration from 'serviceWorkerRegistration';

export const ServiceWorker = () => {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  const handleUpdate = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    window.location.replace(window.location.href);
  };

  const onSWUpdate = (registration: ServiceWorkerRegistration) => {
    toast(
      <ToastWithButton buttonText="Odśwież" onButtonClick={handleUpdate}>
        Aktualizacja aplikacji jest dostępna
      </ToastWithButton>,
      { duration: Infinity },
    );

    setWaitingWorker(registration.waiting);
  };

  useEffect(() => {
    serviceWorkerRegistration.register({ onUpdate: onSWUpdate });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
