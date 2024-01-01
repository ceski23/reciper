import { keyframes, style } from '@macaron-css/core'
import { useLayoutEffect } from 'react'

const fadeIn = keyframes({
	from: {
		opacity: 0,
	},
})

const fadeOut = keyframes({
	to: {
		opacity: 0,
	},
})

const slideFromRight = keyframes({
	from: {
		transform: 'translateX(30px)',
	},
})

const slideToLeft = keyframes({
	to: {
		transform: 'translateX(-30px)',
	},
})

const slideFromLeft = keyframes({
	from: {
		transform: 'translateX(-30px)',
	},
})

const slideToRight = keyframes({
	to: {
		transform: 'translateX(30px)',
	},
})

const pushClass = style({
	selectors: {
		'&::view-transition-old(root)': {
			animation: `90ms cubic-bezier(0.4, 0, 1, 1) both ${fadeOut}, 300ms cubic-bezier(0.4, 0, 0.2, 1) both ${slideToLeft}`,
		},
		'&::view-transition-new(root)': {
			animation: `210ms cubic-bezier(0, 0, 0.2, 1) 90ms both ${fadeIn}, 300ms cubic-bezier(0.4, 0, 0.2, 1) both ${slideFromRight}`,
		},
	},
})

const popClass = style({
	selectors: {
		'&::view-transition-old(root)': {
			animationName: `${fadeOut}, ${slideToRight}`,
		},
		'&::view-transition-new(root)': {
			animationName: `${fadeIn}, ${slideFromLeft}`,
		},
	},
})

export const useScreenNavigationAnimations = () => {
	useLayoutEffect(() => {
		document.documentElement.classList.add(pushClass)

		const handler = () => {
			document.documentElement.classList.add(popClass)
			setTimeout(() => document.documentElement.classList.remove(popClass), 500)
		}

		window.addEventListener('popstate', handler)

		return () => window.removeEventListener('popstate', handler)
	}, [])
}
