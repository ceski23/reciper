import { style, keyframes } from '@vanilla-extract/css'

const rippleExpand = keyframes({
	from: {
		transform: 'scale(0)',
	},
	to: {
		transform: 'scale(1)',
	},
})

const rippleFade = keyframes({
	from: {
		opacity: 0.1,
	},
	to: {
		opacity: 0,
	},
})

export const rippleContainer = style({
	position: 'absolute',
	inset: 0,
	overflow: 'hidden',
	pointerEvents: 'none',
	borderRadius: 'inherit',
})

export const ripple = style({
	position: 'absolute',
	borderRadius: '50%',
	background: 'currentColor',
	transformOrigin: 'center',
	transform: 'scale(1)',
	opacity: 0.1,
	willChange: 'transform, opacity',
})

export const rippleEnter = style({
	animation: `${rippleExpand} 300ms cubic-bezier(0.2, 0, 0, 1) forwards`,
})

export const rippleExit = style({
	animation: `${rippleFade} 300ms linear forwards`,
})

export const reducedMotion = {
	'@media': {
		'(prefers-reduced-motion: reduce)': {
			animation: 'none',
		},
	},
}
