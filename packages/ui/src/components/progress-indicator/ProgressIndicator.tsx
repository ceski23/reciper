import { Progress } from '@base-ui/react'
import { FunctionComponent } from 'react'
import {
	trackStyle,
	stopStyle,
	type ProgressIndicatorVariants,
	indicatorStyle,
	indicatorSecondStyle,
	rootStyle,
} from './style.css'
import { VisuallyHidden } from '../utils'

type ProgressIndicatorProps = Progress.Root.Props &
	Omit<NonNullable<ProgressIndicatorVariants>, 'isIndeterminate'> & {
		label: string
	}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

/**
 * A progress indicator component that displays the progress of a task.
 * Based on https://cs.android.com/androidx/platform/frameworks/support/+/androidx-main:compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/ProgressIndicator.kt;l=249
 */
export const ProgressIndicator: FunctionComponent<ProgressIndicatorProps> = ({
	value,
	min = 0,
	max = 100,
	size = 'thin',
	label,
}) => {
	const isIndeterminate = value === null
	const progress = clamp(((value ?? 0) - (min ?? 0)) / ((max ?? 100) - (min ?? 0)), 0, 1)

	return (
		<Progress.Root
			className={rootStyle()}
			value={isIndeterminate ? null : clamp(value ?? 0, min, max)}
			min={min}
			max={max}
			style={
				{
					'--progress': progress,
					'--gap': progress === 0 ? '0px' : '6px',
				} as React.CSSProperties
			}
		>
			<Progress.Label render={<VisuallyHidden />}>{label}</Progress.Label>
			{!isIndeterminate && <Progress.Indicator className={indicatorStyle({ size, isIndeterminate })} />}
			<Progress.Track className={trackStyle({ size, isIndeterminate })}>
				{isIndeterminate ? (
					<>
						<div className={indicatorStyle({ size, isIndeterminate })} />
						<div className={indicatorSecondStyle({ size, isIndeterminate })} />
					</>
				) : (
					<div className={stopStyle({ size })} />
				)}
			</Progress.Track>
		</Progress.Root>
	)
}
