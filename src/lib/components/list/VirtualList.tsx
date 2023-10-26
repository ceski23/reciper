import { styled } from '@macaron-css/react'
import { type ComponentProps, type FunctionComponent } from 'react'
import { VList } from 'virtua'
import { List } from './List'

export const VirtualList: FunctionComponent<
	ComponentProps<typeof List> & {
		virtualProps?: Omit<ComponentProps<typeof VList>, 'children'>
	}
> = ({
	children,
	virtualProps,
	...props
}) => {
	return (
		<StyledList {...props}>
			<StyledVList {...virtualProps}>
				{children}
			</StyledVList>
		</StyledList>
	)
}

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
