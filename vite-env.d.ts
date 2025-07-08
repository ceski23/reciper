declare const __APP_VERSION__: string
declare const __COMMIT_HASH__: string

interface Set<T> {
	difference(iterable: Iterable<T>): Set<T>
	intersection(iterable: Iterable<T>): Set<T>
}
