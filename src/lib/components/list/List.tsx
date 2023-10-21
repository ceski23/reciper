import { styled } from '@macaron-css/react'
import * as RovingFocusGroup from '@radix-ui/react-roving-focus'
import { type ComponentProps, type FunctionComponent } from 'react'

export const List: FunctionComponent<ComponentProps<typeof ListBase>> = props => {
	return <ListBase {...props} />
}

const ListBase = styled(RovingFocusGroup.Root, {
	base: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
	},
})
