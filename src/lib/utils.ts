export const isDefined = <T>(item: T): item is NonNullable<T> => item !== undefined && item !== null

export const isArrayOf = <T>(value: unknown, predicate: (value: unknown) => value is T): value is Array<T> =>
	Array.isArray(value) && value.every(predicate)
export const isString = (val: unknown): val is string => typeof val === 'string'
