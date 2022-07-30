import { renderHookWithProviders } from 'test/utils';

import { useSearchParams } from 'hooks/useSearchParams';

describe('useSearchParams', () => {
  it('should parse search params', () => {
    const initialParams = new URLSearchParams([
      ['a', '1'],
      ['b', '2'],
      ['b', '3'],
      ['c', 'test'],
      ['c', '4'],
      ['d', 'test'],
    ]);

    const { result } = renderHookWithProviders(() => useSearchParams(), {
      initialRoute: `/?${initialParams.toString()}`,
    });

    expect(result.current.searchParams).toStrictEqual({
      a: 1,
      b: [2, 3],
      c: ['test', 4],
      d: 'test',
    });
  });

  it('should modify search params', () => {
    const initialParams = new URLSearchParams({ a: '1', b: 'test' });

    const { result, history } = renderHookWithProviders(() => useSearchParams(), {
      initialRoute: `/?${initialParams.toString()}`,
    });

    expect(result.current.searchParams).toStrictEqual({
      a: 1,
      b: 'test',
    });

    result.current.setSearchParams({
      a: 'test',
      b: '1',
    });

    // Check in hook data
    expect(result.current.searchParams).toStrictEqual({
      a: 'test',
      b: 1,
    });

    // Check in URL
    const newParams = new URLSearchParams(history.location.search);
    expect(newParams.get('a')).toBe('test');
    expect(newParams.get('b')).toBe('1');
  });
});
