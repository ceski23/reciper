import { styled } from '@macaron-css/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { animated, config, useTransition } from '@react-spring/web'
import { type ComponentProps, type FunctionComponent } from 'react'
import { type SvgSpriteIconName } from 'virtual:svg-sprite'
import { Icon } from 'lib/components/Icon'
import { styleUtils, theme } from 'lib/styles'
import { Typography } from './Typography'

type ContentProps = {
	open: boolean
}

// TODO: Add expand animation as per M3 specs
const Content: FunctionComponent<ComponentProps<typeof MenuBase> & ContentProps> = ({
	open,
	children,
	...props
}) => {
	const transitions = useTransition(open, {
		from: { opacity: 0, y: -20, scaleY: 0.9 },
		enter: { opacity: 1, y: 0, scaleY: 1 },
		leave: { opacity: 0, y: -20, scaleY: 0.9 },
		config: config.stiff,
	})

	return transitions((styles, isOpen) =>
		isOpen
			? (
				<DropdownMenu.Portal forceMount>
					<MenuBase
						sideOffset={8}
						align="end"
						asChild
						{...props}
					>
						<MenuItemsContainer style={styles}>
							{children}
						</MenuItemsContainer>
					</MenuBase>
				</DropdownMenu.Portal>
			)
			: null
	)
}

type MenuItemProps = {
	text: string
	icon?: SvgSpriteIconName
}

const Item: FunctionComponent<Omit<ComponentProps<typeof MenuItemBase>, 'children'> & MenuItemProps> = ({
	text,
	icon,
	...props
}) => (
	<MenuItemBase {...props}>
		{icon && <ItemIcon name={icon} />}
		<Typography.BodyLarge>{text}</Typography.BodyLarge>
	</MenuItemBase>
)

const MenuBase = styled(DropdownMenu.Content, {
	base: {
		backgroundColor: theme.colors.surfaceContainer,
		borderRadius: 4,
		minWidth: 112,
		maxWidth: 280,
		display: 'flex',
		flexDirection: 'column',
		paddingBlock: 8,
		paddingInline: 0,
		// TODO: Declare shadow variants in theme
		boxShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
	},
})

const MenuItemsContainer = styled(animated.div, {
	base: {
		transformOrigin: 'top',
	},
})

const MenuItemBase = styled(DropdownMenu.Item, {
	base: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingBlock: 8,
		paddingInline: 12,
		gap: 12,
		height: 56,
		color: theme.colors.onSurface,
		transition: 'background-color .2s, color .2s',
		outline: 'none',
		cursor: 'pointer',
		':focus-visible': {
			backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.08),
		},
		selectors: {
			'&[aria-disabled="true"]': {
				opacity: 0.38,
				cursor: 'unset',
			},
			'&:not([aria-disabled="true"]):hover': {
				backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.08),
			},
			'&:not([aria-disabled="true"]):active': {
				backgroundColor: theme.colors.surfaceContainerHighest,
				color: theme.colors.onSurfaceVariant,
			},
		},
	},
})

const ItemIcon = styled(Icon, {
	base: {
		width: 24,
		height: 24,
	},
})

export const Menu = {
	Content,
	Item,
	Root: DropdownMenu.Root,
	Trigger: DropdownMenu.Trigger,
}
