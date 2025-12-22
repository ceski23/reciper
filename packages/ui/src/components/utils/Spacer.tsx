import type { ComponentProps, FunctionComponent } from 'react'
import { Box } from './Box'

/**
 * A flexible spacer component that expands to fill available space.
 */
export const Spacer: FunctionComponent<ComponentProps<typeof Box>> = props => (
	<Box
		display="flex"
		flex="1"
		{...props}
	/>
)
