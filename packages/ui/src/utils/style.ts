export const blendWithColor = (color: string, color2: string, opacity: number) =>
	`color-mix(in srgb, ${color}, ${color2} ${opacity * 100}%)`

export const transparentize = (color: string, opacity: number) => blendWithColor(color, 'transparent', 1 - opacity)

export const pxToRem = (px: number) => `${px / 16}rem`
