import { useToggle } from 'hooks/useToggle';

export const useModal = (initialOpen: boolean) => {
  const [isOpen, open, close] = useToggle(initialOpen);

  return {
    isOpen,
    open,
    close,
  };
};
