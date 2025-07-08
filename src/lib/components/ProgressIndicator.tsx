import { createVar, keyframes } from '@macaron-css/core'
import { styled } from '@macaron-css/react'
import type { ComponentProps, FunctionComponent } from 'react'
import { theme } from 'lib/styles'

type LinearProgressIndicatorProps = ComponentProps<'div'> & {
	max?: number
	value?: number
}

const Linear: FunctionComponent<LinearProgressIndicatorProps> = ({
	value,
	max,
	...props
}) => {
	const width = value !== undefined
		? (value / (max ?? 100)).toLocaleString('en', { style: 'percent' })
		: undefined

	return (
		// eslint-disable-next-line jsx-a11y/prefer-tag-over-role
		<LinearBase
			{...props}
			role="progressbar"
			aria-valuemax={max}
			aria-valuenow={value}
		>
			<LinearIndicator
				isIndeterminate={value === undefined}
				style={{ width }}
			/>
		</LinearBase>
	)
}

const LinearBase = styled('div', {
	base: {
		display: 'flex',
		height: 4,
		backgroundColor: theme.colors.surfaceContainerHighest,
		width: '100%',
		overflow: 'hidden',
	},
})

const animation1 = keyframes({
	'0%': {
		left: '-35%',
		right: '100%',
	},
	'60%': {
		left: '100%',
		right: '-90%',
	},
	'100%': {
		left: '100%',
		right: '-90%',
	},
})

const animation2 = keyframes({
	'0%': {
		left: '-200%',
		right: '100%',
	},
	'60%': {
		left: '107%',
		right: '-8%',
	},
	'100%': {
		left: '107%',
		right: '-8%',
	},
})

const LinearIndicator = styled('div', {
	variants: {
		isIndeterminate: {
			true: {
				width: '100%',
				position: 'relative',
				'::before': {
					content: '',
					position: 'absolute',
					backgroundColor: theme.colors.primary,
					top: 0,
					left: 0,
					bottom: 0,
					willChange: 'left, right',
					animation: `${animation1} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`,
				},
				'::after': {
					content: '',
					position: 'absolute',
					backgroundColor: theme.colors.primary,
					top: 0,
					left: 0,
					bottom: 0,
					willChange: 'left, right',
					animation: `${animation2} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite`,
					animationDelay: '1.15s',
				},
			},
			false: {
				backgroundColor: theme.colors.primary,
			},
		},
	},
	defaultVariants: {
		isIndeterminate: false,
	},
})

type CircularProgressIndicatorProps = ComponentProps<'svg'> & {
	// TODO: add support for determinate progress
	// max?: number
	// value?: number
}

const Circular: FunctionComponent<CircularProgressIndicatorProps> = props => (
	// eslint-disable-next-line jsx-a11y/prefer-tag-over-role
	<SpinnerBase
		viewBox="0 0 66 66"
		fill="none"
		strokeWidth={6}
		strokeLinecap="round"
		strokeLinejoin="round"
		role="progressbar"
		color={theme.colors.primary}
		{...props}
	>
		<SpinnerIndicator
			cx={33}
			cy={33}
			r={30}
		/>
	</SpinnerBase>
)

const spinningAnimation = keyframes({
	'0%': {
		rotate: '0deg',
	},
	'100%': {
		rotate: '270deg',
	},
})

const offset = createVar('strokeDashoffset')
const duration = createVar('animationDuration')

const dashAnimation = keyframes({
	'0%': {
		strokeDashoffset: offset,
	},
	'50%': {
		strokeDashoffset: `calc(${offset} / 4)`,
		transform: 'rotate(135deg)',
	},
	'100%': {
		strokeDashoffset: offset,
		transform: 'rotate(450deg)',
	},
})

const SpinnerBase = styled('svg', {
	base: {
		animation: `${spinningAnimation} ${duration} linear infinite`,
		vars: {
			[offset]: '187px',
			[duration]: '1.4s',
		},
	},
})

const SpinnerIndicator = styled('circle', {
	base: {
		strokeDasharray: offset,
		strokeDashoffset: 0,
		transformOrigin: 'center',
		stroke: 'currentColor',
		animation: `${dashAnimation} ${duration} ease-in-out infinite`,
	},
})

export const ProgressIndicator = { Linear, Circular }
