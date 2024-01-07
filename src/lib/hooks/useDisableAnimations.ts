import { style } from '@macaron-css/core'
import { Globals, useReducedMotion } from '@react-spring/web'
import { useAtomValue } from 'jotai'
import { useLayoutEffect } from 'react'
import { settingsAtom } from 'lib/stores/settings'

const disabledAnimationsClass = style({
	selectors: {
		'&::view-transition-group(*), &::view-transition-old(*), &::view-transition-new(*)': {
			animation: 'none !important',
		},
	},
})

export const useDisableAnimations = () => {
	const areDisabledAnimations = useAtomValue(settingsAtom).theme.disabledAnimations
	const isReducedMotion = useReducedMotion() ?? false
	const shouldDisableAnimations = areDisabledAnimations || isReducedMotion

	useLayoutEffect(() => {
		if (shouldDisableAnimations) {
			document.documentElement.classList.add(disabledAnimationsClass)
			Globals.assign({ skipAnimation: true })
		}

		if (!shouldDisableAnimations) {
			document.documentElement.classList.remove(disabledAnimationsClass)
			Globals.assign({ skipAnimation: false })
		}
	}, [shouldDisableAnimations])
}