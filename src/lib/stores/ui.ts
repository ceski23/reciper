import { createStore } from 'stan-js'
import { storage } from 'stan-js/storage'

type UIState = {
	header: HTMLElement | null
	overlayContainer: HTMLElement | null
	mainContent: HTMLElement | null
	recipesViewMode: 'list' | 'grid'
}

export const uiStore = createStore<UIState>({
	header: null,
	overlayContainer: null,
	mainContent: null,
	recipesViewMode: storage('list'),
})
