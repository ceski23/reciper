import * as Ariakit from '@ariakit/react'
import { styled } from '@macaron-css/react'
import { type FunctionComponent } from 'react'
import { type SvgSpriteIconName } from 'virtual:svg-sprite'
import { styleUtils, theme } from 'lib/styles'
import { Icon } from '../Icon'
import { Typography } from '../Typography'

type MenuItemProps = Omit<Ariakit.MenuItemProps, 'children'> & {
	text: string
	icon?: SvgSpriteIconName
}

export const MenuItem: FunctionComponent<MenuItemProps> = ({
	text,
	icon,
	...props
}) => (
	<Container {...props}>
		{icon && (
			<Icon
				size={24}
				name={icon}
			/>
		)}
		<Typography.BodyLarge>{text}</Typography.BodyLarge>
	</Container>
)

const Container = styled(Ariakit.MenuItem, {
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
