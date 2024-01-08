import { createStore } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { focusAtom } from 'jotai-optics'

export const store = createStore()

export type Settings = {
	theme: {
		colorScheme: 'dark' | 'light' | undefined
		dynamicColor: boolean
		disabledAnimations: boolean
	}
	language?: string
}

export const settingsAtom = atomWithStorage<Settings>('reciperSettings', {
	theme: {
		colorScheme: undefined,
		dynamicColor: true,
		disabledAnimations: false,
	},
	language: undefined,
})

export const languageAtom = focusAtom(settingsAtom, optic => optic.prop('language'))
