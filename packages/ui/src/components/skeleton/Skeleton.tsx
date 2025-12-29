import { type FunctionComponent } from 'react'
import { Box } from '../utils'
import { skeletonStyle } from './style.css'

export type SkeletonProps = React.ComponentProps<typeof Box>

/**
 * A flexible Skeleton UI component for loading states.
 * Features shimmer animation and supports all Box props for flexible sizing.
 */
export const Skeleton: FunctionComponent<SkeletonProps> = ({ className, ...props }) => (
	<Box
		className={skeletonStyle}
		aria-busy="true"
		aria-hidden="true"
		{...props}
	/>
)
