export const transparentize = (color: string, opacity: number) => `color-mix(in srgb, ${color}, transparent ${100 - (opacity * 100)}%)`
export const blendWithColor = (color: string, color2: string, opacity: number) => `color-mix(in srgb, ${color}, ${color2} ${opacity * 100}%)`
