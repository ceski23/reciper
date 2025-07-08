import { styled } from '@macaron-css/react'
import { type MaskitoOptions } from '@maskito/core'
import { useMaskito } from '@maskito/react'
import mergeRefs from 'merge-refs'
import { type ComponentProps, forwardRef, type RefCallback, useId } from 'react'
import { styleUtils, theme } from 'lib/styles'
import { Typography, typography } from './Typography'

export type TextAreaProps = {
	label: string
	placeholder?: string
	value: string
	onValueChange?: (value: string) => void
	supportingText?: string
	disabled?: boolean
	required?: boolean
	textAreaProps?: ComponentProps<'textarea'>
	className?: string
	hasError?: boolean
	isSelected?: boolean
	mask?: MaskitoOptions
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
	label,
	placeholder,
	value,
	onValueChange,
	supportingText,
	hasError,
	disabled,
	required,
	textAreaProps,
	className,
	isSelected,
	mask,
}, ref) => {
	const maskitoRef = useMaskito({ options: mask }) as RefCallback<HTMLTextAreaElement>
	const fieldId = useId()
	const supportingTextId = useId()
	const labelId = useId()
	const shouldShrinkLabel = placeholder !== undefined || value.length > 0

	return (
		<FieldContainer className={className}>
			<FieldInnerContainer
				hasError={hasError}
				disabled={disabled}
				selected={isSelected}
			>
				<FieldTextArea
					ref={mergeRefs(ref, maskitoRef)}
					value={value}
					onInput={event => onValueChange?.(event.currentTarget.value)}
					placeholder={placeholder}
					id={fieldId}
					disabled={disabled}
					aria-required={required}
					className={typography.bodyLarge}
					aria-invalid={hasError}
					aria-describedby={supportingText !== undefined ? supportingTextId : undefined}
					aria-labelledby={labelId}
					{...textAreaProps}
				/>
				<FieldLabel
					shrinked={shouldShrinkLabel}
					htmlFor={fieldId}
					className={shouldShrinkLabel ? typography.bodySmall : typography.bodyLarge}
					id={labelId}
				>
					{label}
					{required && <RequiredIndicator>*</RequiredIndicator>}
				</FieldLabel>
			</FieldInnerContainer>
			{supportingText && (
				<SupportingText
					id={supportingTextId}
					hasError={hasError}
					role={hasError ? 'alert' : undefined}
				>
					{supportingText}
				</SupportingText>
			)}
		</FieldContainer>
	)
})

const FieldContainer = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		overflowX: 'clip',
	},
})

const FieldInnerContainer = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'row',
		border: `1px solid ${theme.colors.outline}`,
		color: theme.colors.onSurfaceVariant,
		alignItems: 'center',
		position: 'relative',
		borderRadius: 4,
		transition: 'border-color .2s, outline .2s',
		outline: '2px solid transparent',
		outlineOffset: -2,
		width: '100%',
		':hover': {
			borderColor: theme.colors.onSurface,
		},
		':focus-within': {
			outlineColor: theme.colors.primary,
			borderColor: theme.colors.primary,
		},
	},
	variants: {
		hasError: {
			true: {
				outlineColor: theme.colors.error,
				borderColor: theme.colors.error,
				color: theme.colors.error,
			},
		},
		disabled: {
			true: {
				color: styleUtils.transparentize(theme.colors.onSurface, 0.5),
				opacity: 0.38,
				':hover': {
					borderColor: theme.colors.outline,
				},
			},
		},
		selected: {
			true: {
				outlineColor: theme.colors.primary,
				borderColor: theme.colors.primary,
				':hover': {
					outlineColor: theme.colors.primary,
					borderColor: theme.colors.primary,
				},
			},
		},
	},
})

const FieldTextArea = styled('textarea', {
	base: {
		display: 'block',
		color: theme.colors.onSurface,
		border: 'none',
		background: 'none',
		paddingBlock: 16,
		paddingInline: 16,
		outline: 'none',
		minWidth: 0,
		flex: 1,
		'::placeholder': {
			color: theme.colors.onSurfaceVariant,
		},
	},
})

const FieldLabel = styled('label', {
	base: {
		position: 'absolute',
		transition: 'top .2s, left .2s, font-size .2s, padding-inline .2s, color .2s',
		top: 15,
		left: 16,
		paddingInline: 0,
		selectors: {
			':focus-within ~ &': {
				paddingInline: 4,
				left: 12,
				top: -8,
				backgroundColor: theme.colors.surface,
				color: theme.colors.primary,
				// Body/Small
				fontSize: 12,
				lineHeight: '16px',
				letterSpacing: 0.4,
			},
		},
	},
	variants: {
		shrinked: {
			true: {
				paddingInline: 4,
				left: 12,
				top: -8,
				backgroundColor: theme.colors.surface,
			},
		},
	},
})

const SupportingText = styled(Typography.BodySmall, {
	base: {
		color: theme.colors.onSurfaceVariant,
		paddingTop: 4,
		paddingInline: 16,
	},
	variants: {
		hasError: {
			true: {
				color: theme.colors.error,
			},
		},
	},
})

const RequiredIndicator = styled('sup', {
	base: {
		color: theme.colors.error,
		marginLeft: 2,
		lineHeight: 1,
		fontSize: '70%',
	},
})
