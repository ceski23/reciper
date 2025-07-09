import * as Ariakit from '@ariakit/react'
import { FloatingActionButton } from '@components/FloatingActionButton'
import { Icon } from '@components/Icon'
import { IconButton } from '@components/IconButton'
import { Typography } from '@components/Typography'
import { styled } from '@macaron-css/react'
import { styleUtils, theme } from '@styles/index'
import { Link, type ToOptions } from '@tanstack/react-router'
import { type ComponentPropsWithoutRef, type FunctionComponent, type ReactNode } from 'react'
import { type SvgSpriteIconName } from 'virtual:svg-sprite'

type NavigationRailRootProps = {
	children: ReactNode
	fab?: ComponentPropsWithoutRef<typeof FloatingActionButton>
	segmentsAlignment?: ComponentPropsWithoutRef<typeof RailNavWrapper>['alignment']
	onMenuClick?: () => void
}

const NavigationRailRoot: FunctionComponent<NavigationRailRootProps> = ({
	children,
	onMenuClick,
	fab,
	segmentsAlignment = 'top',
	...props
}) => (
	<RailContainer {...props}>
		<TopContainer>
			{onMenuClick && (
				<IconButton
					icon="menu"
					title="Menu"
					onClick={onMenuClick}
				/>
			)}
			{fab && <FloatingActionButton {...fab} />}
		</TopContainer>
		<RailNavWrapper alignment={segmentsAlignment}>
			<RailNav>
				{children}
			</RailNav>
		</RailNavWrapper>
	</RailContainer>
)

export type NavigationRailSegmentProps = {
	label: string
	icon: SvgSpriteIconName
	badge?: boolean | string
	hideLabel?: boolean
	to: ToOptions['to']
}

const NavigationRailSegment = ({
	icon,
	badge,
	label,
	hideLabel,
	to,
	...props
}: NavigationRailSegmentProps) => {
	return (
		<SegmentBase
			aria-label={hideLabel ? label : undefined}
			to={to}
			{...props}
		>
			<IconContainer withLabel={!hideLabel}>
				<SegmentIcon
					name={icon}
					size={24}
				/>
				{badge && (
					<Badge variant={typeof badge === 'string' ? 'nonEmpty' : 'empty'}>
						{typeof badge === 'string' && (
							<Typography.LabelSmall>
								{badge}
							</Typography.LabelSmall>
						)}
					</Badge>
				)}
			</IconContainer>
			{!hideLabel && (
				<Typography.LabelMedium>
					{label}
				</Typography.LabelMedium>
			)}
		</SegmentBase>
	)
}

export const NavigationRail = {
	Root: NavigationRailRoot,
	Segment: NavigationRailSegment,
}

const RailContainer = styled(Ariakit.Role, {
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: 40,
		paddingTop: 44,
		paddingBottom: 56,
		width: 80,
		viewTransitionName: 'navbar',
	},
})

const TopContainer = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: 4,
		alignItems: 'center',
	},
})

const RailNav = styled('nav', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		padding: 5,
		gap: 16,
		width: '100%',
	},
})

const RailNavWrapper = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
	},
	variants: {
		alignment: {
			top: {
				justifyContent: 'flex-start',
			},
			middle: {
				justifyContent: 'center',
			},
			bottom: {
				justifyContent: 'flex-end',
			},
		},
	},
})

const SegmentBase = styled(Link, {
	base: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 4,
		width: '100%',
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		textDecoration: 'none',
		color: theme.colors.onSurfaceVariant,
		minHeight: 56,
		':focus-visible': {
			outline: 'none',
		},
		selectors: {
			'&[data-status="active"]': {
				color: theme.colors.onSecondaryContainer,
			},
		},
	},
})

const IconContainer = styled('div', {
	base: {
		borderRadius: 100,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		transition: 'background-color .2s, color .2s',
		position: 'relative',
		selectors: {
			':hover > &': {
				backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.08),
			},
			':focus-visible > &': {
				backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.12),
			},
			':active > &': {
				backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.12),
			},
			'[data-status="active"] > &': {
				backgroundColor: theme.colors.secondaryContainer,
			},
			'[data-status="active"]:hover > &': {
				backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.08),
			},
			'[data-status="active"]:focus-visible > &': {
				backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.12),
			},
			'[data-status="active"]:active > &': {
				backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.12),
			},
		},
	},
	variants: {
		withLabel: {
			true: {
				paddingBlock: 4,
				paddingInline: 16,
			},
			false: {
				paddingBlock: 16,
				paddingInline: 16,
			},
		},
	},
})

const Badge = styled('div', {
	base: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		backgroundColor: theme.colors.error,
		color: theme.colors.onPrimary,
		borderRadius: 100,
	},
	variants: {
		variant: {
			empty: {
				minWidth: 'unset',
				minHeight: 'unset',
				padding: 'unset',
				width: 6,
				height: 6,
				translate: '9px -9px',
			},
			nonEmpty: {
				minWidth: 16,
				minHeight: 16,
				translate: '8px -6px',
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
