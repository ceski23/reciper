import { renderHook } from '@testing-library/react-hooks';

import { useWakelock } from 'hooks/recipes/useWakelock';

vi.mock('react-screen-wake-lock', () => ({
  useWakeLock: vi.fn(() => ({
    isSupported: true,
    request: vi.fn(),
    released: undefined,
    release: vi.fn(),
    type: 'screen',
  })),
}));

describe('useWakelock', () => {
  it('should acquire and release wakelock', () => {
    const { result, unmount } = renderHook(() => useWakelock());

    expect(result.current.request).toBeCalledTimes(1);
    expect(result.current.release).toBeCalledTimes(0);

    unmount();

    expect(result.current.request).toBeCalledTimes(1);
    expect(result.current.release).toBeCalledTimes(1);
  });
});
