import { createStore } from 'stan-js'
import { storage } from 'stan-js/storage'

export type Settings = {
	theme: {
		colorScheme: 'dark' | 'light' | undefined
		dynamicColor: boolean
		disabledAnimations: boolean
	}
	language?: string
}

export const settingsStore = createStore({
	theme: storage<Settings['theme']>({
		colorScheme: undefined,
		dynamicColor: true,
		disabledAnimations: false,
	}),
	language: storage<Settings['language']>(undefined),
})
