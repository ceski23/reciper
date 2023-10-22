import { styled } from '@macaron-css/react'
import * as RovingFocusGroup from '@radix-ui/react-roving-focus'
import { Fragment, type FunctionComponent, type ReactElement } from 'react'
import { Typography } from 'lib/components/Typography'
import { styleUtils, theme } from 'lib/styles'
import Icon, { type SvgName } from '~virtual/svg-component'

export type MainContentProps = {
	leadingElement?: SvgName | ReactElement
	iconColor?: string
	title: string
	text?: string
	hasWrappedText?: boolean
}

export const MainContent: FunctionComponent<MainContentProps> = ({ title, iconColor, leadingElement, text, hasWrappedText }) => {
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
				<Title>{title}</Title>
				{text && <TextComponent>{text}</TextComponent>}
			</Content>
		</Fragment>
	)
}

export const ListItemBase = styled(RovingFocusGroup.Item, {
	base: {
		display: 'flex',
		paddingBlock: 8,
		paddingLeft: 16,
		paddingRight: 24,
		gap: 16,
		backgroundColor: theme.colors.surface,
		border: 'none',
		transition: 'background-color .2s',
		textAlign: 'start',
		textDecoration: 'none',
	},
	variants: {
		size: {
			'2line': {
				alignItems: 'center',
			},
			'3line': {},
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
				':active': {
					// TODO: add ripple effect instead
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

const EllipsedText = styled(Typography.BodyMedium, {
	base: {
		color: theme.colors.onSurfaceVariant,
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
	},
})
