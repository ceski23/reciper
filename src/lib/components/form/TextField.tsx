import { type Control, Controller, type ControllerRenderProps, type FieldValues, type Path } from 'react-hook-form'
import { TextInput, type TextInputProps } from 'lib/components/TextInput'

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
				...rest
			},
			fieldState: { error },
		}) => (
			<TextInput
				{...rest}
				{...props}
				onValueChange={value => onChange(value || null)}
				value={value?.toString() ?? ''}
				error={error?.message}
			/>
		)}
	/>
)
