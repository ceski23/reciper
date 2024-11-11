import { ProgressIndicator } from '@components/ProgressIndicator'
import { styled } from '@macaron-css/react'
import { animated, to, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { type NotificationComponentProps } from 'features/notifications'
import { styleUtils, theme } from 'lib/styles'
import { Icon } from './Icon'
import { Typography } from './Typography'

export const Snackbar = forwardRef<HTMLOutputElement, NotificationComponentProps>(({
	action,
	dismissable,
	content,
	onHide,
	style,
	loading,
}, ref) => {
	const { t } = useTranslation()
	const [{ x, opacity }, api] = useSpring(() => ({ x: 0, opacity: 1 }))
	const bind = useDrag(({ last, movement: [x], currentTarget }) => {
		if (!last) {
			return api.start({ x, immediate: true })
		}

		if (Math.abs(x) > 100) {
			return api.start({
				x: (currentTarget as HTMLElement).getBoundingClientRect().width * (x > 0 ? 1 : -1),
				opacity: 0,
				onRest: onHide,
			})
		}

		api.start({ x: 0, opacity: 1 })
	}, {
		axis: 'x',
		from: () => [x.get(), 0],
	})

	return (
		<SnackbarBase
			variant={((action !== undefined || dismissable) && !loading) ? 'withAction' : 'textOnly'}
			ref={ref}
			{...bind()}
			style={{
				...style,
				x,
				opacity: to([style.opacity, opacity], (hideOpacity, swipeOpacity) => Math.min(hideOpacity, swipeOpacity)),
			}}
		>
			<Text>{content}</Text>
			{loading
				? (
					<ProgressIndicator.Circular
						width={24}
						color={theme.colors.inverseOnSurface}
					/>
				)
				: action
				? (
					<ActionButton onClick={action.onClick}>
						<Typography.LabelLarge>
							{action.label}
						</Typography.LabelLarge>
					</ActionButton>
				)
				: undefined}
			{dismissable && (
				<DismissButton
					aria-label={t('notifications.close')}
					onClick={onHide}
				>
					<Icon
						size={24}
						name="close"
					/>
				</DismissButton>
			)}
		</SnackbarBase>
	)
})

const SnackbarBase = styled(animated.output, {
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
		pointerEvents: 'auto',
		touchAction: 'none',
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

const ActionButton = styled('button', {
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

const DismissButton = styled('button', {
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
