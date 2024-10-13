import { CompositeItem } from '@ariakit/react'
import { useRipples } from '@hooks/useRipples'
import { styled } from '@macaron-css/react'
import mergeProps from 'merge-props'
import { type ComponentProps, forwardRef, type ReactNode } from 'react'
import { ListItemContainer } from './ListItemContainer'
import { ListItemContent, type ListItemContentProps } from './ListItemContent'

type SimpleItemProps = {
	trailingElement?: ReactNode
	onClick?: VoidFunction
}

export const SimpleItem = forwardRef<
	HTMLDivElement,
	ComponentProps<typeof ListItemContainer> & SimpleItemProps & Omit<ListItemContentProps, 'hasWrappedText'>
>(({
	title,
	text,
	leadingElement,
	iconColor,
	trailingElement,
	overline,
	...props
}, ref) => {
	const { eventHandlers, renderRipples } = useRipples()

	return (
		<ListItemContainer
			aria-label={title}
			ref={ref}
			{...(props.onClick !== undefined
				? {
					variant: 'clickable',
					...mergeProps(props, eventHandlers),
					render: <Button />,
				}
				: props)}
		>
			{renderRipples}
			<ListItemContent
				overline={overline}
				title={title}
				text={text}
				leadingElement={leadingElement}
				iconColor={iconColor}
				hasWrappedText={props.size === '3line'}
			/>
			{trailingElement}
		</ListItemContainer>
	)
})

const Button = styled(CompositeItem, {
	base: {
		position: 'relative',
	},
})
