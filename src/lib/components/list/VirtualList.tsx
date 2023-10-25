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
		<List {...props}>
			<StyledVList {...virtualProps}>
				{children}
			</StyledVList>
		</List>
	)
}

const StyledVList = styled(VList, {
	base: {
		height: '100%',
	},
})
