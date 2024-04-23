import { styled } from '@macaron-css/react'
import { useElementScrollRestoration } from '@tanstack/react-router'
import { type ComponentProps, forwardRef } from 'react'
import { VList } from 'virtua'
import { List } from './List'

export const VirtualList = forwardRef<
	HTMLDivElement,
	ComponentProps<typeof List> & {
		virtualProps?: Omit<ComponentProps<typeof VList>, 'children'>
		scrollRestorationId?: string
	}
>(({
	children,
	virtualProps,
	scrollRestorationId,
	...props
}, ref) => {
	const scrollEntry = useElementScrollRestoration({ id: scrollRestorationId ?? '' })

	return (
		<StyledList
			{...props}
			ref={ref}
		>
			<StyledVList
				{...virtualProps}
				ref={handle => scrollEntry && handle?.scrollTo(scrollEntry.scrollY)}
				data-scroll-restoration-id={scrollRestorationId}
			>
				{children}
			</StyledVList>
		</StyledList>
	)
})

const StyledList = styled(List, {
	base: {
		flex: 1,
	},
})

const StyledVList = styled(VList, {
	base: {
		height: '100%',
	},
})
