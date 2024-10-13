// Copied from: https://github.com/radix-ui/primitives/blob/b32a93318cdfce383c2eec095710d35ffbd33a1c/packages/react/slider/src/Slider.tsx#L749
export const linearScale = (input: readonly [number, number], output: readonly [number, number]) => {
	return (value: number) => {
		if (input[0] === input[1] || output[0] === output[1]) return output[0]
		const ratio = (output[1] - output[0]) / (input[1] - input[0])
		return output[0] + ratio * (value - input[0])
	}
}

export const clamp = (min: number, max: number) => (value: number) => Math.min(Math.max(value, min), max)
