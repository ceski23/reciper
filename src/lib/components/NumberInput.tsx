import { TextInput, type TextInputProps } from '@components/TextInput'
import { maskitoTransform } from '@maskito/core'
import { maskitoNumberOptionsGenerator, maskitoParseNumber } from '@maskito/kit'
import { getSeparator } from '@utils/numbers'
import { forwardRef, useMemo } from 'react'

type NumberMaskParams = NonNullable<Parameters<typeof maskitoNumberOptionsGenerator>[0]>

export type NumberInputProps = Omit<TextInputProps, 'mask'> & NumberMaskParams & {
	onNumberChange?: (value: number) => void
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(({
	min,
	max,
	precision = 2,
	prefix,
	postfix,
	decimalPseudoSeparators,
	decimalSeparator = getSeparator('en', 'decimal'),
	decimalZeroPadding,
	minusSign,
	thousandSeparator = getSeparator('en', 'group'),
	onValueChange,
	onNumberChange,
	value,
	...props
}, ref) => {
	const mask = useMemo(() =>
		maskitoNumberOptionsGenerator({
			min,
			max,
			precision,
			prefix,
			postfix,
			decimalPseudoSeparators,
			decimalSeparator,
			decimalZeroPadding,
			minusSign,
			thousandSeparator,
		}), [min, max, precision, prefix, postfix, decimalPseudoSeparators, decimalSeparator, decimalZeroPadding, minusSign, thousandSeparator])

	return (
		<TextInput
			ref={ref}
			mask={mask}
			onValueChange={value => {
				onValueChange?.(value)
				onNumberChange?.(maskitoParseNumber(value, decimalSeparator))
			}}
			value={maskitoTransform(value, mask)}
			{...props}
		/>
	)
})
