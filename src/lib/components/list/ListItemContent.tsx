import { styled } from '@macaron-css/react'
import { Fragment, type FunctionComponent, type ReactElement, type ReactNode } from 'react'
import type { SvgSpriteIconName } from 'virtual:svg-sprite'
import { Icon } from 'lib/components/Icon'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'

export type ListItemContentProps = {
	leadingElement?: SvgSpriteIconName | ReactElement
	iconColor?: string
	title: string
	text?: ReactNode
	hasWrappedText?: boolean
	overline?: string
}

export const ListItemContent: FunctionComponent<ListItemContentProps> = ({
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
