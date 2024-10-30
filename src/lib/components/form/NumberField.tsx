import { type Control, Controller, type ControllerRenderProps, type FieldValues, type Path } from 'react-hook-form'
import { NumberInput, type NumberInputProps } from '../NumberInput'

export type NumberFieldProps<
	TFormShape extends FieldValues,
	TFieldName extends Path<TFormShape>,
> = Omit<NumberInputProps, keyof ControllerRenderProps<TFormShape, TFieldName>> & {
	name: TFieldName
	control: Control<TFormShape>
	label: string
}

export const NumberField = <TFormShape extends FieldValues, TFieldName extends Path<TFormShape>>({
	name,
	control,
	inputProps,
	onNumberChange,
	...props
}: NumberFieldProps<TFormShape, TFieldName>) => (
	<Controller<TFormShape, TFieldName>
		control={control}
		name={name}
		shouldUnregister
		render={({
			field: {
				onChange,
				value,
				onBlur,
				name,
				ref,
				disabled,
			},
			fieldState: { error },
		}) => (
			<NumberInput
				ref={ref}
				disabled={disabled}
				onNumberChange={value => {
					onChange(Number.isNaN(value) ? null : value)
					onNumberChange?.(value)
				}}
				value={value?.toString() ?? ''}
				hasError={Boolean(error)}
				supportingText={error?.message}
				inputProps={{
					...inputProps,
					onBlur: event => {
						inputProps?.onBlur?.(event)
						onBlur()
					},
					name,
				}}
				{...props}
			/>
		)}
	/>
)
