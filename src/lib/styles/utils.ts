import { type Breakpoint, breakpoints } from '@styles/theme'

export const transparentize = (color: string, opacity: number) => `color-mix(in srgb, ${color}, transparent ${100 - (opacity * 100)}%)`
export const blendWithColor = (color: string, color2: string, opacity: number) => `color-mix(in srgb, ${color}, ${color2} ${opacity * 100}%)`
export const mergeClassNames = (classNames: Array<string | undefined>) =>
	classNames.filter(className => className !== undefined && className.length > 0).join(' ')

export const mq = {
	upTo: (breakpoint: Breakpoint) => `(${breakpoints[breakpoint]}px > width)`,
	atLeast: (breakpoint: Breakpoint) => `(${breakpoints[breakpoint]}px <= width)`,
	between: (breakpointA: Breakpoint, breakpointB: Breakpoint) => `(${breakpoints[breakpointA]}px <= width < ${breakpoints[breakpointB]}px)`,
	only: (breakpoint: Breakpoint) => {
		const entries = Object.entries(breakpoints) as Array<[keyof typeof breakpoints, number]>
		const index = entries.findIndex(([key]) => key === breakpoint)
		const nextBreakpoint = entries.at(index + 1)?.[1]

		return nextBreakpoint !== undefined
			? `(${breakpoints[breakpoint]}px <= width < ${nextBreakpoint}px)`
			: `(${breakpoints[breakpoint]}px <= width)`
	},
	darkMode: '(prefers-color-scheme: dark)',
}
