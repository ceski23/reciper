import { styled } from '@macaron-css/react'
import * as RovingFocusGroup from '@radix-ui/react-roving-focus'
import { Fragment, type FunctionComponent, type ReactElement, type ReactNode } from 'react'
import type { SvgSpriteIconName } from 'virtual:svg-sprite'
import { Icon } from 'lib/components/Icon'
import { Typography } from 'lib/components/Typography'
import { styleUtils, theme } from 'lib/styles'

export type MainContentProps = {
	leadingElement?: SvgSpriteIconName | ReactElement
	iconColor?: string
	title: string
	text?: ReactNode
	hasWrappedText?: boolean
	overline?: string
}

export const MainContent: FunctionComponent<MainContentProps> = ({
	title,
	iconColor,
	leadingElement,
	text,
	hasWrappedText,
	overline,
}) => {
	const TextComponent = hasWrappedText ? Text : EllipsedText

	return (
		<Fragment>
			{typeof leadingElement === 'string'
				? (
					<SimpleIcon
						name={leadingElement}
						style={{ color: iconColor }}
					/>
				)
				: leadingElement}
			<Content variant={text === undefined ? 'dense' : 'normal'}>
				{overline && <Overline>{overline}</Overline>}
				<Title>{title}</Title>
				{text && <TextComponent>{text}</TextComponent>}
			</Content>
		</Fragment>
	)
}

export const ListItemBase = styled(RovingFocusGroup.Item, {
	base: {
		display: 'flex',
		paddingLeft: 16,
		paddingRight: 24,
		gap: 16,
		backgroundColor: 'unset',
		border: 'none',
		transition: 'background-color .2s',
		textAlign: 'start',
		textDecoration: 'none',
		color: theme.colors.onSurface,
		width: '100%',
	},
	variants: {
		size: {
			'2line': {
				alignItems: 'center',
				paddingBlock: 8,
			},
			'3line': {
				paddingBlock: 12,
			},
		},
		variant: {
			clickable: {
				cursor: 'pointer',
				outline: 'none',
				':hover': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.surface, theme.colors.onSurface, 0.08),
				},
				':focus-visible': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.surface, theme.colors.onSurface, 0.12),
				},
			},
			nonClickable: {},
		},
	},
	defaultVariants: {
		size: '2line',
		variant: 'nonClickable',
	},
})

const Content = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		flex: 1,
		minWidth: 0,
	},
	variants: {
		variant: {
			normal: {
				minHeight: 56,
			},
			dense: {
				minHeight: 40,
			},
		},
	},
})

const SimpleIcon = styled(Icon, {
	base: {
		width: 24,
		height: 24,
		color: theme.colors.onSurfaceVariant,
	},
})

const Title = styled(Typography.BodyLarge, {
	base: {
		color: theme.colors.onSurface,
	},
})

const Text = styled(Typography.BodyMedium, {
	base: {
		color: theme.colors.onSurfaceVariant,
	},
})

const Overline = styled(Typography.LabelMedium, {
	base: {
		color: theme.colors.primary,
	},
})

const EllipsedText = styled(Typography.BodyMedium, {
	base: {
		color: theme.colors.onSurfaceVariant,
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
	},
})
