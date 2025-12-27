import 'react'

declare module 'react' {
	// oxlint-disable-next-line consistent-type-definitions
	interface CSSProperties {
		[key: `--${string}`]: string | number
	}
}
