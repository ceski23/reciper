import { CompositeItem } from '@ariakit/react'
import { styled } from '@macaron-css/react'
import { Link, type ToOptions } from '@tanstack/react-router'
import mergeProps from 'merge-props'
import { type ComponentProps, forwardRef } from 'react'
import { ListItemContainer } from 'lib/components2/list/ListItemContainer'
import { ListItemContent, type ListItemContentProps } from 'lib/components2/list/ListItemContent'
import { useRipples } from 'lib/hooks/useRipples'

type LinkItemProps = Pick<ToOptions, 'to' | 'search' | 'params' | 'state'>

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
	...props
}, ref) => {
	const { eventHandlers, renderRipples } = useRipples()

	return (
		<CompositeItem
			render={(
				<ListItemContainer
					variant="clickable"
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
