import { styled } from '@macaron-css/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { type ComponentProps, type FunctionComponent } from 'react'
import { styleUtils, theme } from 'lib/styles'
import { Typography } from './Typography'

const Content: FunctionComponent<ComponentProps<typeof MenuBase>> = props => (
	<DropdownMenu.Portal>
		<MenuBase
			sideOffset={8}
			align="end"
			{...props}
		/>
	</DropdownMenu.Portal>
)

type MenuItemProps = {
	text: string
}

const Item: FunctionComponent<Omit<ComponentProps<typeof MenuItemBase>, 'children'> & MenuItemProps> = ({
	text,
	...props
}) => (
	<MenuItemBase {...props}>
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

const MenuItemBase = styled(DropdownMenu.Item, {
	base: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingBlock: 8,
		paddingInline: 12,
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

export const Menu = {
	Content,
	Item,
	Root: DropdownMenu.Root,
	Trigger: DropdownMenu.Trigger,
}
