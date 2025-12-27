import {
	circularRootStyle,
	circularSvgStyle,
	circularTrackStyle,
	circularIndicatorStyle,
	type CircularProgressIndicatorVariants,
	progressVar,
} from './style.css'
import { VisuallyHidden } from '../utils'
import { Progress } from '@base-ui/react/progress'
import type { FunctionComponent } from 'react'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { mergeProps } from '@base-ui/react'

type CircularProgressIndicatorProps = Progress.Root.Props &
	Omit<NonNullable<CircularProgressIndicatorVariants>, 'isIndeterminate'> & {
		value?: number | null
		min?: number
		max?: number
		label: string
	}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

/**
 * A circular progress indicator component.
 */
export const CircularProgressIndicator: FunctionComponent<CircularProgressIndicatorProps> = ({
	value = null,
	min = 0,
	max = 100,
	size = 'thin',
	label,
	...props
}) => {
	const isIndeterminate = value === null
	const progress = isIndeterminate ? 0 : clamp(((value ?? 0) - (min ?? 0)) / ((max ?? 100) - (min ?? 0)), 0, 1)

	return (
		<Progress.Root
			className={circularRootStyle()}
			value={isIndeterminate ? null : clamp(value ?? 0, min, max)}
			min={min}
			max={max}
			{...mergeProps(props, {
				style: assignInlineVars({
					[progressVar]: progress.toString(),
				}),
			})}
		>
			<Progress.Label render={<VisuallyHidden />}>{label}</Progress.Label>
			<svg
				className={circularSvgStyle({ isIndeterminate })}
				viewBox="0 0 100 100"
			>
				<Progress.Track
					className={circularTrackStyle({ size, isIndeterminate })}
					render={
						<circle
							cx="50"
							cy="50"
							r={45}
						/>
					}
				/>
				<Progress.Indicator
					className={circularIndicatorStyle({ size, isIndeterminate })}
					render={
						<circle
							cx="50"
							cy="50"
							r={45}
						/>
					}
				/>
			</svg>
		</Progress.Root>
	)
}
