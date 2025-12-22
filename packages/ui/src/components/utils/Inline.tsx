import type { ComponentProps, FunctionComponent } from 'react'
import { Box } from './Box'

/**
 * A flexbox container that arranges its children in a horizontal row.
 */
export const Inline: FunctionComponent<ComponentProps<typeof Box>> = props => (
	<Box
		display="flex"
		flexDirection="row"
		{...props}
	/>
)
