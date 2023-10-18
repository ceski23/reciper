import { styled } from '@macaron-css/react'
import * as RovingFocusGroup from '@radix-ui/react-roving-focus'
import type { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { useIsLinkActive } from 'lib/hooks'
import { styleUtils, theme } from 'lib/styles'
import { Typography } from '../Typography'
import type { SvgName } from '~virtual/svg-component'
import Icon from '~virtual/svg-component'

export type NavigationSegmentProps = {
	label?: string
	icon: SvgName
	badge?: boolean | string
	to: string
}

export const NavigationSegment: FunctionComponent<RovingFocusGroup.RovingFocusItemProps & NavigationSegmentProps> = ({
	label,
	icon,
	badge,
	to,
	...props
}) => {
	const isActive = useIsLinkActive(to)

	return (
		<SegmentBase
			{...props}
			asChild
			active={isActive}
		>
			<NavLink to={to}>
				<IconContainer>
					<SegmentIcon name={icon} />
					{badge && (
						<Badge variant={typeof badge === 'string' ? undefined : 'empty'}>
							{typeof badge === 'string' && (
								<Typography.LabelSmall>
									{badge}
								</Typography.LabelSmall>
							)}
						</Badge>
					)}
				</IconContainer>
				{label && (
					<Typography.LabelMedium>
						{label}
					</Typography.LabelMedium>
				)}
			</NavLink>
		</SegmentBase>
	)
}

const SegmentBase = styled(RovingFocusGroup.Item, {
	base: {
		paddingTop: 12,
		paddingBottom: 16,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 4,
		width: '100%',
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		color: theme.colors.onSurfaceVariant,
		textDecoration: 'unset',
		':focus-visible': {
			outline: 'none',
		},
		selectors: {
			'&[aria-current="page"]': {
				color: theme.colors.onSecondaryContainer,
			},
		},
	},
})

const IconContainer = styled('div', {
	base: {
		width: 64,
		height: 32,
		borderRadius: 16,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		paddingBlock: 4,
		paddingInline: 20,
		transition: 'background-color .2s, color .2s',
		position: 'relative',
		selectors: {
			[`:hover > &`]: {
				backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.08),
			},
			[`:focus-visible > &`]: {
				backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.12),
			},
			[`:active > &`]: {
				backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.12),
			},
			[`[aria-current="page"] > &`]: {
				backgroundColor: theme.colors.secondaryContainer,
			},
			[`[aria-current="page"]:hover > &`]: {
				backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.08),
			},
			[`[aria-current="page"]:focus-visible > &`]: {
				backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.12),
			},
			[`[aria-current="page"]:active > &`]: {
				backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.12),
			},
		},
	},
})

const Badge = styled('div', {
	base: {
		display: 'flex',
		minWidth: 16,
		paddingInline: 4,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: 2,
		right: 16,
		backgroundColor: theme.colors.error,
		color: theme.colors.onPrimary,
		borderRadius: 100,
	},
	variants: {
		variant: {
			empty: {
				minWidth: 'unset',
				padding: 'unset',
				width: 6,
				height: 6,
				top: 4,
				right: 20,
			},
		},
	},
})

const SegmentIcon = styled(Icon, {
	base: {
		width: '100%',
		height: '100%',
	},
})