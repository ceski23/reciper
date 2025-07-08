/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import 'vitest'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface CustomMatchers<R = unknown> {
	toBeValidRecipe: () => void
}

declare module 'vitest' {
	interface Assertion<T = any> extends CustomMatchers<T> {}
	interface AsymmetricMatchersContaining extends CustomMatchers {}
}
