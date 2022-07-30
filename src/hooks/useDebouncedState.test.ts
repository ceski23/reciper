import { renderHookWithProviders } from 'test/utils';

import { useDebouncedState } from 'hooks/useDebouncedState';

describe('useDebounceState', () => {
  it('should change value immediately', () => {
    const { result } = renderHookWithProviders(() => useDebouncedState(0, 100));

    let [value, debouncedValue, setValue] = result.current;

    expect(value).toBe(0);
    expect(debouncedValue).toBe(0);

    setValue(1, true);

    [value, debouncedValue, setValue] = result.current;

    expect(value).toBe(1);
    expect(debouncedValue).toBe(1);
  });

  it('should change value after 100ms', () => {
    vi.useFakeTimers();

    const { result } = renderHookWithProviders(() => useDebouncedState(0, 100));

    let [value, debouncedValue, setValue] = result.current;

    expect(value).toBe(0);
    expect(debouncedValue).toBe(0);

    setValue(1, false);

    [value, debouncedValue, setValue] = result.current;

    expect(value).toBe(1);
    expect(debouncedValue).toBe(0);

    vi.advanceTimersByTime(100);

    [value, debouncedValue, setValue] = result.current;

    expect(value).toBe(1);
    expect(debouncedValue).toBe(1);

    vi.useRealTimers();
  });
});
