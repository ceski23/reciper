import { styled } from '@macaron-css/react'
import { type ComponentProps, forwardRef } from 'react'
import { VList } from 'virtua'
import { List } from './List'

export const VirtualList = forwardRef<
	HTMLDivElement,
	ComponentProps<typeof List> & {
		virtualProps?: Omit<ComponentProps<typeof VList>, 'children'>
	}
>(({
	children,
	virtualProps,
	...props
}, ref) => {
	return (
		<StyledList
			{...props}
			ref={ref}
		>
			<StyledVList {...virtualProps}>
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
