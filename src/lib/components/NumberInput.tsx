import { TextInput, type TextInputProps } from '@components/TextInput'
import { maskitoTransform } from '@maskito/core'
import { maskitoNumberOptionsGenerator, maskitoParseNumber } from '@maskito/kit'
import { getSeparator } from '@utils/numbers'
import { useMemo } from 'react'

type NumberMaskParams = NonNullable<Parameters<typeof maskitoNumberOptionsGenerator>[0]>

export type NumberInputProps = Omit<TextInputProps, 'mask'> & NumberMaskParams & {
	onNumberChange?: (value: number) => void
}

export const NumberInput = ({
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
	ref,
	...props
}: NumberInputProps) => {
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
}
