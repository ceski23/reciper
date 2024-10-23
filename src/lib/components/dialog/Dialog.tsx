import * as Ariakit from '@ariakit/react'
import { styled } from '@macaron-css/react'
import { animated, type SpringValue } from '@react-spring/web'
import { type ComponentProps, type FunctionComponent, isValidElement, type ReactElement } from 'react'
import type { SvgSpriteIconName } from 'virtual:svg-sprite'
import { styleUtils, theme } from 'lib/styles'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { Typography } from '../Typography'

type DialogActionItem = {
	label: string
	onClick: VoidFunction
}

type SimpleDialogProps = {
	title: string
	description: string
	icon?: SvgSpriteIconName
	actions: Array<DialogActionItem | ReactElement>
	extraContent?: ReactElement | string
	closeOnClickOutside?: boolean
	styles?: {
		opacity: SpringValue<number>
	}
}

export const SimpleDialog: FunctionComponent<SimpleDialogProps & ComponentProps<typeof Ariakit.Dialog>> = ({
	title,
	description,
	icon,
	actions,
	extraContent,
	closeOnClickOutside = true,
	styles,
	...props
}) => (
	<DialogContent
		unmountOnHide
		backdrop={<DialogOverlay style={{ opacity: styles?.opacity }} />}
		style={styles}
		variant={icon ? 'withIcon' : 'simple'}
		hideOnInteractOutside={closeOnClickOutside}
		{...props}
	>
		{icon && <DialogIcon name={icon} />}
		<Ariakit.DialogHeading render={<Title />}>
			{title}
		</Ariakit.DialogHeading>
		<Ariakit.DialogDescription render={<Description />}>
			{description}
		</Ariakit.DialogDescription>
		{extraContent && <DialogExtraContent>{extraContent}</DialogExtraContent>}
		<DialogActions>
			{actions.map(action =>
				isValidElement(action) ? action : 'label' in action
					? (
						<Button
							key={action.label}
							onClick={action.onClick}
							type="button"
							variant="text"
						>
							{action.label}
						</Button>
					)
					: null
			)}
		</DialogActions>
	</DialogContent>
)

const DialogOverlay = styled(animated.div, {
	base: {
		width: '100vw',
		height: '100vh',
		backgroundColor: styleUtils.transparentize(theme.colors.scrim, 0.32),
		position: 'fixed',
		inset: 0,
	},
})

const DialogContent = styled(animated(Ariakit.Dialog), {
	base: {
		minWidth: 280,
		maxWidth: 560,
		width: '80%',
		display: 'grid',
		gridTemplateColumns: '24px 1fr 24px',
		gridAutoFlow: 'row',
		borderRadius: 28,
		backgroundColor: theme.colors.surfaceContainerHigh,
		color: theme.colors.onSurface,
		position: 'fixed',
		transition: 'bottom .2s',
		bottom: 'calc(env(keyboard-inset-height, 0) + ((100vh - env(keyboard-inset-height, 0)) / 2))',
		left: '50%',
		translate: '-50% 50%',
		paddingBlock: 24,
		rowGap: 16,
	},
	variants: {
		variant: {
			simple: {},
			withIcon: {
				justifyItems: 'center',
			},
		},
	},
})

const DialogActions = styled('div', {
	base: {
		display: 'flex',
		gap: 8,
		marginLeft: 'auto',
		paddingTop: 8,
		gridColumn: 2,
	},
})

const DialogIcon = styled(Icon, {
	base: {
		width: 24,
		height: 24,
		color: theme.colors.secondary,
		gridColumn: 2,
	},
})

const DialogExtraContent = styled('div', {
	base: {
		paddingTop: 8,
		width: '100%',
		gridColumn: '1 / -1',
	},
})

const Title = styled(Typography.HeadlineSmall, {
	base: {
		gridColumn: 2,
	},
})

const Description = styled(Typography.BodyMedium, {
	base: {
		gridColumn: 2,
		width: '100%',
	},
})
