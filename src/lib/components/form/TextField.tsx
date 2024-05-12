import { get } from 'radash'
import { type Control, Controller, type ControllerRenderProps, type FieldErrors, type FieldValues, type Path, useFormState } from 'react-hook-form'
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
}: TextFieldProps<TFormShape, TFieldName>) => {
	const { errors } = useFormState<TFormShape>({ name, control })
	const errorMessage = get<FieldErrors<TFormShape>[TFieldName]>(errors, name)?.message

	return (
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
			}) => (
				<TextInput
					{...rest}
					{...props}
					onValueChange={value => onChange(value || undefined)}
					value={value?.toString() ?? ''}
					error={typeof errorMessage === 'string' ? errorMessage : undefined}
				/>
			)}
		/>
	)
}
