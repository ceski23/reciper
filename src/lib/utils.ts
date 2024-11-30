export const isDefined = <T>(item: T): item is NonNullable<T> => item !== undefined && item !== null
