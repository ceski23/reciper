import toast from 'react-hot-toast';
import { useRegisterSW } from 'virtual:pwa-register/react';

import { ToastWithButton } from 'components/common/ToastWithButton';

export const ServiceWorker = () => {
  const { updateServiceWorker } = useRegisterSW({
    onNeedRefresh: () => {
      toast(
        <ToastWithButton buttonText="Odśwież" onButtonClick={() => updateServiceWorker(true)}>
          Aktualizacja aplikacji jest dostępna
        </ToastWithButton>,
        { duration: Infinity },
      );
    },
  });

  return null;
};
