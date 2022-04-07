import { useState } from 'react';

export const useToggle = (initialState: boolean) => {
  const [isOpen, setOpen] = useState(initialState);

  const close = () => setOpen(false);
  const open = () => setOpen(true);
  const toggle = () => setOpen((state) => !state);

  return [isOpen, open, close, toggle] as const;
};
