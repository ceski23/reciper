/**
 * Creates an object with the specified keys, all mapped to the same value.
 * @param keys - An array of keys to use in the resulting object
 * @param value - The value to assign to each key
 * @returns An object with the specified keys, each mapped to the provided value
 * @example
 * const result = mapTo(['a', 'b', 'c'], true);
 * // result: { a: true, b: true, c: true }
 */
export const mapTo = <const Key extends string, Value>(keys: readonly Key[], value: Value) => {
	return Object.fromEntries(keys.map(key => [key, value])) as Record<Key, Value>
}
