import { type Control, Controller, type ControllerRenderProps, type FieldValues, type Path } from 'react-hook-form'
import { TextInput, type TextInputProps } from '../TextInput'

export type TextFieldProps<
	TFormShape extends FieldValues,
	TFieldName extends Path<TFormShape>,
> = Omit<TextInputProps, keyof ControllerRenderProps<TFormShape, TFieldName>> & {
	name: TFieldName
	control: Control<TFormShape>
	label: string
}

export const TextField = <TFormShape extends FieldValues, TFieldName extends Path<TFormShape>>({
	name,
	control,
	inputProps,
	onValueChange,
	...props
}: TextFieldProps<TFormShape, TFieldName>) => (
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
			<TextInput
				ref={ref}
				disabled={disabled}
				onValueChange={value => {
					onChange(value || null)
					onValueChange?.(value)
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
