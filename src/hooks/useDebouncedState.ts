import debounce from 'lodash.debounce';
import { useState, useCallback, Dispatch } from 'react';

export const useDebouncedState = <T>(initial: T, timeout: number) => {
  const [value, setValue] = useState(initial);
  const [debouncedValue, setDebouncedValue] = useState(initial);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetter = useCallback(
    debounce<Dispatch<T>>((nextValue) => {
      setDebouncedValue(nextValue);
    }, timeout),
    [],
  );

  const enchancedSetter = (newValue: T, instant = false) => {
    setValue(newValue);

    if (instant) {
      setDebouncedValue(newValue);
    } else {
      debouncedSetter(newValue);
    }
  };

  return [
    value,
    debouncedValue,
    enchancedSetter,
  ] as const;
};
