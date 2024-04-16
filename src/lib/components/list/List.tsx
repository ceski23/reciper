import { styled } from '@macaron-css/react'
import * as RovingFocusGroup from '@radix-ui/react-roving-focus'
import { type ComponentProps, forwardRef } from 'react'

export const List = forwardRef<HTMLDivElement, ComponentProps<typeof ListBase>>((props, ref) => {
	return (
		<ListBase
			{...props}
			ref={ref}
		/>
	)
})

const ListBase = styled(RovingFocusGroup.Root, {
	base: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
	},
})
