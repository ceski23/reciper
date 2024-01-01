import { styled } from '@macaron-css/react'
import * as Label from '@radix-ui/react-label'
import * as RovingFocusGroup from '@radix-ui/react-roving-focus'
import mergeProps from 'merge-props'
import { type ComponentProps, type FunctionComponent } from 'react'
import { Switch } from 'lib/components/Switch'
import { useRipples } from 'lib/hooks/useRipples'
import { styleUtils, theme } from 'lib/styles'
import { ListItemBase, MainContent, type MainContentProps } from './MainContent'

type SwitchItemProps = {
	switchProps?: ComponentProps<typeof Switch>
	isDisabled?: boolean
}

export const SwitchItem: FunctionComponent<ComponentProps<typeof ListItemBase> & SwitchItemProps & Omit<MainContentProps, 'hasWrappedText'>> = ({
	title,
	text,
	leadingElement,
	iconColor,
	switchProps,
	overline,
	isDisabled,
	...props
}) => {
	const { eventHandlers, renderRipples } = useRipples()

	return (
		<SwitchItemBase
			variant="clickable"
			isDisabled={isDisabled}
			focusable={false}
			aria-label={title}
			{...props}
			asChild
			{...mergeProps(props, eventHandlers)}
		>
			<Container>
				{!isDisabled && renderRipples}
				<MainContent
					overline={overline}
					title={title}
					text={text}
					leadingElement={leadingElement}
					iconColor={iconColor}
					hasWrappedText={props.size === '3line'}
				/>
				<RovingFocusGroup.Item asChild>
					<Switch
						{...switchProps}
						disabled={isDisabled}
					/>
				</RovingFocusGroup.Item>
			</Container>
		</SwitchItemBase>
	)
}

const SwitchItemBase = styled(ListItemBase, {
	base: {
		selectors: {
			'&:focus-within:has(> :focus-visible)': {
				backgroundColor: styleUtils.blendWithColor(theme.colors.surface, theme.colors.onSurface, 0.12),
			},
		},
	},
	variants: {
		isDisabled: {
			true: {
				opacity: 0.3,
			},
		},
	},
})

const Container = styled(Label.Root, {
	base: {
		position: 'relative',
	},
})
