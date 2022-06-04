import { useContext } from 'react';

import { ModalContext } from 'components/common/modal/Modal';

export const useModalContext = () => {
  const data = useContext(ModalContext);

  if (data === undefined) throw Error('You can use this hook only in modal component');

  return data;
};
