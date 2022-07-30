import { renderHook } from '@testing-library/react-hooks';

import { useModal } from 'hooks/useModal';

describe('useModal', () => {
  it('should open/close modal', () => {
    const { result } = renderHook(() => useModal(false));

    expect(result.current.isOpen).toBe(false);

    result.current.open();
    expect(result.current.isOpen).toBe(true);

    result.current.close();
    expect(result.current.isOpen).toBe(false);
  });
});
