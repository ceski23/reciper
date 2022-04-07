/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prefer-destructuring */
import { useMemo } from 'react';
import { useSearchParams as useRouterSearchParams } from 'react-router-dom';

export const useSearchParams = <T>() => {
  const [searchParams, setSearchParams] = useRouterSearchParams();

  const params = useMemo(() => {
    const map: Partial<T> = {};

    Array.from(searchParams.keys()).forEach((key) => {
      const value = searchParams.getAll(key);
      const typedKey = key as unknown as keyof T;

      if (value.length > 1) map[typedKey] = value as any;
      else map[typedKey] = value[0] as any;
    });

    return map;
  }, [searchParams]);

  return {
    searchParams: params,
    setSearchParams,
  };
};
