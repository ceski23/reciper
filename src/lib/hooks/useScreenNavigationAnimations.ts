import { keyframes, style } from '@macaron-css/core'
import { useRouter } from '@tanstack/react-router'
import { useLayoutEffect, useRef } from 'react'
import { theme } from 'lib/styles'

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
		'&::view-transition-image-pair(root)': {
			background: theme.colors.background,
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
	const { history } = useRouter()
	const locationRef = useRef<Array<string | undefined>>([])

	useLayoutEffect(() => {
		locationRef.current = [history.location.state.key]

		const unsub = history.subscribe(() => {
			const newKey = history.location.state.key

			if (locationRef.current.at(-2) === newKey) {
				document.documentElement.classList.toggle(popClass, true)
				document.documentElement.classList.toggle(pushClass, false)
				locationRef.current.pop()
			} else {
				document.documentElement.classList.toggle(popClass, false)
				document.documentElement.classList.toggle(pushClass, true)
				locationRef.current.push(history.location.state.key)
			}
		})

		return () => {
			unsub()
			locationRef.current = []
		}
	}, [history])
}
