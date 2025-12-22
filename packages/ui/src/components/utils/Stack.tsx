import type { ComponentProps, FunctionComponent } from 'react'
import { Box } from './Box'

/**
 * A flexible vertical stack component that arranges child elements in a column layout.
 */
export const Stack: FunctionComponent<ComponentProps<typeof Box>> = props => (
	<Box
		display="flex"
		flexDirection="column"
		{...props}
	/>
)
