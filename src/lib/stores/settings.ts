import { atomWithStorage } from 'jotai/utils'

export type Settings = {
	theme: {
		colorScheme: 'dark' | 'light' | undefined
		dynamicColor: boolean
		disabledAnimations: boolean
	}
}

export const settingsAtom = atomWithStorage<Settings>('reciperSettings', {
	theme: {
		colorScheme: undefined,
		dynamicColor: true,
		disabledAnimations: false,
	},
})
