import { keyframes } from '@macaron-css/core'
import { styled } from '@macaron-css/react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { animated } from '@react-spring/web'
import { type ComponentProps, type FunctionComponent, useRef } from 'react'
import { styleUtils, theme } from 'lib/styles'
import { Typography } from './Typography'
import Icon from '~virtual/svg-component'

type SnackbarProps = {
	text: string
	action?: {
		label: string
		onClick?: VoidFunction
	}
	dismissable?: boolean
}

export const Snackbar: FunctionComponent<SnackbarProps & ComponentProps<typeof SnackbarBase>> = ({
	action,
	dismissable,
	text,
	onOpenChange,
	...props
}) => {
	const ref = useRef<HTMLLIElement>(null)

	return (
		<SnackbarBase
			variant={(action !== undefined || dismissable) ? 'withAction' : 'textOnly'}
			onAnimationEnd={event => event.animationName === slideRight && onOpenChange?.(false)}
			onOpenChange={() => {
				if (ref.current?.dataset.swipe === 'end') {
					return
				}

				const animation = ref.current?.animate([
					{
						opacity: 1,
						transform: 'translateY(0px)',
					},
					{
						opacity: 0,
						transform: 'translateY(10px)',
					},
				], {
					duration: 200,
					fill: 'forwards',
				})

				animation?.addEventListener('finish', () => onOpenChange?.(false))
			}}
			ref={ref}
			{...props}
		>
			<ToastPrimitive.Description asChild>
				<Text>{text}</Text>
			</ToastPrimitive.Description>
			{action && (
				<ActionButton
					onClick={action.onClick}
					altText={action.label}
				>
					<Typography.LabelLarge>
						{action.label}
					</Typography.LabelLarge>
				</ActionButton>
			)}
			{dismissable && (
				<DismissButton aria-label="Close snackbar">
					<DismissIcon name="close" />
				</DismissButton>
			)}
		</SnackbarBase>
	)
}

const slideRight = keyframes({
	from: {
		transform: 'translateX(var(--radix-toast-swipe-end-x))',
	},
	to: {
		transform: 'translateX(100%)',
	},
})

const show = keyframes({
	from: {
		opacity: 0,
		transform: 'translateY(10px)',
	},
	to: {
		opacity: 1,
		transform: 'translateY(0px)',
	},
})

const SnackbarBase = styled(animated(ToastPrimitive.Root), {
	base: {
		display: 'flex',
		flexDirection: 'row',
		borderRadius: 4,
		backgroundColor: theme.colors.inverseSurface,
		color: theme.colors.inverseOnSurface,
		width: '100%',
		boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
		gap: 4,
		alignItems: 'center',
		paddingBlock: 4,
		animation: `${show} 200ms ease-out`,
		selectors: {
			'&[data-swipe="move"]': {
				transform: 'translateX(var(--radix-toast-swipe-move-x))',
			},
			'&[data-swipe="cancel"]': {
				transform: 'translateX(0)',
				transition: 'transform 200ms ease-out',
			},
			'&[data-swipe="end"]': {
				animation: `${slideRight} 200ms ease-out forwards`,
			},
		},
	},
	variants: {
		variant: {
			textOnly: {
				paddingInline: 16,
			},
			withAction: {
				paddingLeft: 16,
				paddingRight: 8,
			},
		},
	},
	defaultVariants: {
		variant: 'textOnly',
	},
})

const Text = styled(Typography.BodyMedium, {
	base: {
		flex: 1,
		paddingBlock: 10,
	},
})

const ActionButton = styled(ToastPrimitive.Action, {
	base: {
		display: 'flex',
		paddingBlock: 10,
		paddingInline: 12,
		borderRadius: 100,
		border: 'none',
		backgroundColor: 'transparent',
		color: theme.colors.inversePrimary,
		transition: 'background-color .2s',
		cursor: 'pointer',
		':hover': {
			backgroundColor: styleUtils.transparentize(theme.colors.inversePrimary, 0.08),
		},
		':focus-visible': {
			backgroundColor: styleUtils.transparentize(theme.colors.inversePrimary, 0.12),
		},
		':active': {
			backgroundColor: styleUtils.transparentize(theme.colors.inversePrimary, 0.12),
		},
	},
})

const DismissButton = styled(ToastPrimitive.Close, {
	base: {
		display: 'flex',
		padding: 8,
		borderRadius: '50%',
		border: 'none',
		backgroundColor: 'transparent',
		color: theme.colors.inverseOnSurface,
		transition: 'background-color .2s',
		cursor: 'pointer',
		':hover': {
			backgroundColor: styleUtils.transparentize(theme.colors.inverseOnSurface, 0.08),
		},
		':focus-visible': {
			backgroundColor: styleUtils.transparentize(theme.colors.inverseOnSurface, 0.12),
		},
		':active': {
			backgroundColor: styleUtils.transparentize(theme.colors.inverseOnSurface, 0.12),
		},
	},
})

const DismissIcon = styled(Icon, {
	base: {
		width: 24,
		height: 24,
	},
})
