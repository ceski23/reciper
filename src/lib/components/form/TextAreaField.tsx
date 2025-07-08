import { type Control, Controller, type ControllerRenderProps, type FieldValues, type Path } from 'react-hook-form'
import { TextArea, type TextAreaProps } from '../TextArea'

type TextAreaFieldProps<
	TFormShape extends FieldValues,
	TFieldName extends Path<TFormShape>,
> = Omit<TextAreaProps, keyof ControllerRenderProps<TFormShape, TFieldName>> & {
	name: TFieldName
	control: Control<TFormShape>
	label: string
}

export const TextAreaField = <TFormShape extends FieldValues, TFieldName extends Path<TFormShape>>({
	name,
	control,
	textAreaProps,
	onValueChange,
	...props
}: TextAreaFieldProps<TFormShape, TFieldName>) => (
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
			<TextArea
				ref={ref}
				disabled={disabled}
				onValueChange={value => {
					onChange(value || null)
					onValueChange?.(value)
				}}
				value={value?.toString() ?? ''}
				hasError={Boolean(error)}
				supportingText={error?.message}
				textAreaProps={{
					...textAreaProps,
					onBlur: event => {
						textAreaProps?.onBlur?.(event)
						onBlur()
					},
					name,
				}}
				{...props}
			/>
		)}
	/>
)
