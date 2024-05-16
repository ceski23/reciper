import { styled } from '@macaron-css/react'
import { type ComponentProps, forwardRef, type ReactNode, useId } from 'react'
import { useTranslation } from 'react-i18next'
import type { SvgSpriteIconName } from 'virtual:svg-sprite'
import { Icon } from 'lib/components/Icon'
import { styleUtils, theme } from 'lib/styles'
import { IconButton } from './IconButton'
import { bodyLarge, bodySmall, Typography } from './Typography'

export type TextInputProps = {
	label: string
	placeholder?: string
	value: string
	onValueChange?: (value: string) => void
	error?: string
	disabled?: boolean
	required?: boolean
	leadingIcon?: SvgSpriteIconName
	trailingAddon?: ReactNode
	inputProps?: ComponentProps<'input'>
	className?: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
	label,
	placeholder,
	value,
	onValueChange,
	error,
	disabled,
	required,
	leadingIcon,
	trailingAddon,
	inputProps,
	className,
}, ref) => {
	const { t } = useTranslation()
	const fieldId = useId()
	const supportingTextId = useId()
	const hasError = error !== undefined
	const shouldShrinkLabel = placeholder !== undefined || value.length > 0

	const renderTrailingAddon = typeof trailingAddon === 'string'
		? (
			<FieldAddon className={bodyLarge}>
				{trailingAddon}
			</FieldAddon>
		)
		: trailingAddon
	const renderErrorAddon = <ErrorIcon name="error" />
	const renderClearAddon = (
		<ClearButton
			title={t('forms.clearField')}
			icon="cancel"
			onClick={() => onValueChange?.('')}
		/>
	)

	return (
		<FieldContainer className={className}>
			<FieldInnerContainer
				hasError={hasError}
				disabled={disabled}
			>
				{leadingIcon && (
					<FieldAddon className={bodyLarge}>
						<LeadingIcon name={leadingIcon} />
					</FieldAddon>
				)}
				<FieldInput
					ref={ref}
					value={value}
					onChange={event => onValueChange?.(event.currentTarget.value)}
					placeholder={placeholder}
					id={fieldId}
					disabled={disabled}
					aria-required={required}
					withIcon={leadingIcon !== undefined}
					className={bodyLarge}
					aria-invalid={error !== undefined}
					aria-errormessage={error !== undefined ? supportingTextId : undefined}
					{...inputProps}
				/>
				{trailingAddon
					? renderTrailingAddon
					: error
					? renderErrorAddon
					: value.length > 0 && !disabled
					? renderClearAddon
					: null}
				<FieldLabel
					shrinked={shouldShrinkLabel}
					htmlFor={fieldId}
					withIcon={leadingIcon !== undefined}
					className={shouldShrinkLabel ? bodySmall : bodyLarge}
				>
					{label}
					{required && <RequiredIndicator>*</RequiredIndicator>}
				</FieldLabel>
			</FieldInnerContainer>
			{hasError && (
				<SupportingText
					id={supportingTextId}
					hasError={hasError}
				>
					{error}
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
	},
})

const FieldInput = styled('input', {
	base: {
		display: 'block',
		color: theme.colors.onSurface,
		border: 'none',
		background: 'none',
		paddingBlock: 8,
		paddingLeft: 16,
		height: 54,
		outline: 'none',
		minWidth: 0,
		flex: 1,
		'::placeholder': {
			color: theme.colors.onSurfaceVariant,
		},
	},
	variants: {
		withIcon: {
			true: {
				paddingLeft: 0,
			},
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
		withIcon: {
			true: {
				left: 50,
			},
		},
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

const ClearButton = styled(IconButton, {
	base: {
		marginRight: 8,
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

const ErrorIcon = styled(Icon, {
	base: {
		width: 40,
		height: 40,
		padding: 8,
		margin: 4,
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

const LeadingIcon = styled(Icon, {
	base: {
		width: 24,
		height: 24,
	},
})

const FieldAddon = styled('div', {
	base: {
		minWidth: 40,
		height: 40,
		padding: 8,
		margin: 4,
		color: theme.colors.onSurfaceVariant,
	},
})
