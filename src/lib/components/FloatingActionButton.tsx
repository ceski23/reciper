import { styled } from '@macaron-css/react'
import mergeProps from 'merge-props'
import { type ComponentProps, type FunctionComponent } from 'react'
import { useRipples } from 'lib/hooks/useRipples'
import { styleUtils, theme } from 'lib/styles'
import { Typography } from './Typography'
import Icon, { type SvgName } from '~virtual/svg-component'

type FloatingActionButtonProps = {
	icon: SvgName
	label: string
}

export const FloatingActionButton: FunctionComponent<Omit<ComponentProps<typeof BaseFab>, 'children'> & FloatingActionButtonProps> = ({
	icon,
	label,
	...props
}) => {
	const { eventHandlers, renderRipples } = useRipples()

	return (
		<BaseFab {...mergeProps(props, eventHandlers)}>
			{renderRipples}
			<FabIcon name={icon} />
			<ExpandedContainer isExpanded={props.size === 'expanded'}>
				<TextContainer>
					<FabText>
						{label}
					</FabText>
				</TextContainer>
			</ExpandedContainer>
		</BaseFab>
	)
}

const BaseFab = styled('button', {
	base: {
		display: 'flex',
		transition: 'color .2s, background-color .2s, padding .2s, box-shadow .2s',
		border: 'none',
		width: 'fit-content',
		alignItems: 'center',
		cursor: 'pointer',
		position: 'relative',
		overflow: 'hidden',
		pointerEvents: 'auto',
	},
	variants: {
		size: {
			small: {
				padding: 8,
				height: 40,
				borderRadius: 12,
			},
			medium: {
				padding: 16,
				height: 56,
				borderRadius: 16,
			},
			large: {
				padding: 30,
				height: 96,
				borderRadius: 28,
			},
			expanded: {
				paddingBlock: 16,
				paddingInline: 20,
				borderRadius: 16,
				height: 56,
			},
		},
		variant: {
			surface: {
				backgroundColor: theme.colors.surfaceContainerHigh,
				color: theme.colors.primary,
				boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
				':hover': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.surfaceContainerHigh, theme.colors.primary, 0.08),
					boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.30), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)',
				},
				':focus-visible': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.surfaceContainerHigh, theme.colors.primary, 0.12),
					boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
				},
				':active': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.surfaceContainerHigh, theme.colors.primary, 0.12),
					boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
				},
			},
			primary: {
				backgroundColor: theme.colors.primaryContainer,
				color: theme.colors.onPrimaryContainer,
				boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
				':hover': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.primaryContainer, theme.colors.onPrimaryContainer, 0.08),
					boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.30), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)',
				},
				':focus-visible': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.primaryContainer, theme.colors.onPrimaryContainer, 0.12),
					boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
				},
				':active': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.primaryContainer, theme.colors.onPrimaryContainer, 0.12),
					boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
				},
			},
			secondary: {
				backgroundColor: theme.colors.secondaryContainer,
				color: theme.colors.onSecondaryContainer,
				boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
				':hover': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.08),
					boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.30), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)',
				},
				':focus-visible': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.12),
					boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
				},
				':active': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.12),
					boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
				},
			},
			tertiary: {
				backgroundColor: theme.colors.tertiaryContainer,
				color: theme.colors.onTertiaryContainer,
				boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
				':hover': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.tertiaryContainer, theme.colors.onTertiaryContainer, 0.08),
					boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.30), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)',
				},
				':focus-visible': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.tertiaryContainer, theme.colors.onTertiaryContainer, 0.12),
					boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
				},
				':active': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.tertiaryContainer, theme.colors.onTertiaryContainer, 0.12),
					boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
				},
			},
		},
	},
	defaultVariants: {
		variant: 'surface',
		size: 'medium',
	},
})

const FabIcon = styled(Icon, {
	base: {
		height: '100%',
		aspectRatio: '1',
	},
})

const FabText = styled(Typography.LabelLarge, {
	base: {
		whiteSpace: 'nowrap',
		marginLeft: 12,
	},
})

const TextContainer = styled('div', {
	base: {
		minWidth: 0,
	},
})

const ExpandedContainer = styled('div', {
	base: {
		display: 'grid',
		transition: 'grid-template-columns .5s',
		overflow: 'hidden',
	},
	variants: {
		isExpanded: {
			false: {
				gridTemplateColumns: '0fr',
			},
			true: {
				gridTemplateColumns: '1fr',
			},
		},
	},
	defaultVariants: {
		isExpanded: false,
	},
})
