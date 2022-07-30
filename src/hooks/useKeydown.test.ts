import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';

import { useKeydown } from 'hooks/useKeydown';

describe('useKeydown', () => {
  it('should run on keydown event', async () => {
    const handleKeyDown = vi.fn();
    const user = userEvent.setup();

    renderHook(() => useKeydown('Escape', handleKeyDown));

    expect(handleKeyDown).toBeCalledTimes(0);

    await user.keyboard('{Escape}');

    expect(handleKeyDown).toBeCalledTimes(1);
  });

  it('should not work after unmounting', async () => {
    const handleKeyDown = vi.fn();
    const user = userEvent.setup();

    const { unmount } = renderHook(() => useKeydown('Escape', handleKeyDown));

    expect(handleKeyDown).toBeCalledTimes(0);

    unmount();
    await user.keyboard('{Escape}');

    expect(handleKeyDown).toBeCalledTimes(0);
  });
});
