import { renderHook } from '@testing-library/react-hooks';

import { useToggle } from 'hooks/useToggle';

describe('useToggle', () => {
  it('should properly change value', () => {
    const { result } = renderHook(() => useToggle(false));
    let [isOpen, open, close, toggle] = result.current;

    expect(isOpen).toBe(false);

    open();

    [isOpen, open, close, toggle] = result.current;
    expect(isOpen).toBe(true);

    close();

    [isOpen, open, close, toggle] = result.current;
    expect(isOpen).toBe(false);

    toggle();

    [isOpen, open, close, toggle] = result.current;
    expect(isOpen).toBe(true);

    toggle();

    [isOpen, open, close, toggle] = result.current;
    expect(isOpen).toBe(false);
  });
});
