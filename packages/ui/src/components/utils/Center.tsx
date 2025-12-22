import type { ComponentProps, FunctionComponent } from 'react'
import { Box } from './Box'

/**
 * A flexible centering component that uses flexbox to center content both horizontally and vertically.
 */
export const Center: FunctionComponent<ComponentProps<typeof Box>> = props => (
	<Box
		display="flex"
		justifyContent="center"
		alignItems="center"
		{...props}
	/>
)
