import { CompositeItem } from '@ariakit/react'
import { styled } from '@macaron-css/react'
import mergeProps from 'merge-props'
import type { ComponentProps, FunctionComponent } from 'react'
import { ListItemContainer } from 'lib/components/list/ListItemContainer'
import { ListItemContent, type ListItemContentProps } from 'lib/components/list/ListItemContent'
import { Switch } from 'lib/components/Switch'
import { useRipples } from 'lib/hooks/useRipples'
import { styleUtils, theme } from 'lib/styles'

type SwitchItemProps = {
	switchProps?: ComponentProps<typeof Switch>
	isDisabled?: boolean
}

export const SwitchItem: FunctionComponent<
	ComponentProps<typeof ListItemContainer> & SwitchItemProps & Omit<ListItemContentProps, 'hasWrappedText'>
> = ({
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
		<SwitchItemContainer
			variant="clickable"
			isDisabled={isDisabled}
			aria-label={title}
			{...mergeProps(props, eventHandlers)}
			render={<Container />}
		>
			{!isDisabled && renderRipples}
			<ListItemContent
				overline={overline}
				title={title}
				text={text}
				leadingElement={leadingElement}
				iconColor={iconColor}
				hasWrappedText={props.size === '3line'}
			/>
			<CompositeItem
				render={(
					<Switch
						{...switchProps}
						disabled={isDisabled}
					/>
				)}
			/>
		</SwitchItemContainer>
	)
}

const SwitchItemContainer = styled(ListItemContainer, {
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

const Container = styled('label', {
	base: {
		position: 'relative',
	},
})
