import { styled } from '@macaron-css/react'
import { Link, type ToOptions } from '@tanstack/react-router'
import mergeProps from 'merge-props'
import { type ComponentProps, forwardRef } from 'react'
import { useRipples } from 'lib/hooks/useRipples'
import { ListItemBase, MainContent, type MainContentProps } from './MainContent'

type LinkItemProps = Pick<ToOptions, 'to' | 'search' | 'params' | 'state'>

export const LinkItem = forwardRef<
	HTMLAnchorElement,
	ComponentProps<typeof ListItemBase> & LinkItemProps & Omit<MainContentProps, 'hasWrappedText'>
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
		<ListItemBase
			variant="clickable"
			aria-label={title}
			asChild
			{...mergeProps(props, eventHandlers)}
		>
			<Container
				ref={ref}
				to={to}
				search={search}
				params={params}
				state={state}
			>
				{renderRipples}
				<MainContent
					overline={overline}
					title={title}
					text={text}
					leadingElement={leadingElement}
					iconColor={iconColor}
					hasWrappedText={props.size === '3line'}
				/>
			</Container>
		</ListItemBase>
	)
})

const Container = styled(Link, {
	base: {
		position: 'relative',
	},
})
