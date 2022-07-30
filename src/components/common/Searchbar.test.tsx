import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from 'test/utils';

import { Searchbar } from 'components/common/Searchbar';

describe('Searchbar', () => {
  it('should react to changes respecting debouncing', async () => {
    const handleChange = vi.fn();
    const handleDebouncedChange = vi.fn();

    vi.useFakeTimers();

    const user = userEvent.setup({
      advanceTimers: (delay) => vi.advanceTimersByTime(delay),
    });

    renderWithProviders(
      <Searchbar
        value=""
        onChange={handleChange}
        onDebouncedChange={handleDebouncedChange}
        debounce={500}
      />,
    );

    const searchbar = screen.getByRole('searchbox');
    expect(searchbar).toBeInTheDocument();

    await user.type(searchbar, 'Test');

    expect(handleChange).toHaveBeenCalledTimes(4);
    expect(handleDebouncedChange).toHaveBeenCalledTimes(0);

    vi.advanceTimersByTime(100);

    expect(handleChange).toHaveBeenCalledTimes(4);
    expect(handleDebouncedChange).toHaveBeenCalledTimes(0);

    vi.advanceTimersByTime(400);

    expect(handleChange).toHaveBeenCalledTimes(4);
    expect(handleDebouncedChange).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});
