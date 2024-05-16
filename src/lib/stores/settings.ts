import { createStore } from 'stan-js'
import { storage } from 'stan-js/storage'

export type Settings = {
	theme: {
		colorScheme: 'dark' | 'light' | undefined
		dynamicColor: boolean
		disabledAnimations: boolean
	}
	language: string | undefined
}

export const settingsStore = createStore<Settings>({
	theme: storage({
		colorScheme: undefined,
		dynamicColor: true,
		disabledAnimations: false,
	}),
	language: storage(undefined),
})
