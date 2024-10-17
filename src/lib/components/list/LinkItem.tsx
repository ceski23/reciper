import { CompositeItem } from '@ariakit/react'
import { useRipples } from '@hooks/useRipples'
import { styled } from '@macaron-css/react'
import { Link, type ToOptions } from '@tanstack/react-router'
import mergeProps from 'merge-props'
import { type ComponentProps, forwardRef } from 'react'
import { ListItemContainer } from './ListItemContainer'
import { ListItemContent, type ListItemContentProps } from './ListItemContent'

type LinkItemProps = Pick<ToOptions, 'to' | 'search' | 'params' | 'state'> & {
	isDisabled?: boolean
}

export const LinkItem = forwardRef<
	HTMLAnchorElement,
	ComponentProps<typeof ListItemContainer> & LinkItemProps & Omit<ListItemContentProps, 'hasWrappedText'>
>(({
	title,
	text,
	leadingElement,
	iconColor,
	to,
	search,
	params,
	state,
	overline,
	isDisabled,
	...props
}, ref) => {
	const { eventHandlers, renderRipples } = useRipples()

	return (
		<CompositeItem
			disabled={isDisabled}
			render={(
				<ListItemContainer
					variant={isDisabled ? 'disabled' : 'clickable'}
					aria-label={title}
					{...mergeProps(props, eventHandlers)}
					render={(
						<LinkContainer
							ref={ref}
							to={to}
							search={search}
							params={params}
							state={state}
						/>
					)}
				/>
			)}
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
		</CompositeItem>
	)
})

const LinkContainer = styled(Link, {
	base: {
		position: 'relative',
	},
})
