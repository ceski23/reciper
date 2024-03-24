import { createStore } from '@codemaskinc/store'

export type UIState = {
	header: HTMLElement | null
	overlayContainer: HTMLElement | null
}

export const uiStore = createStore<UIState>({
	header: null,
	overlayContainer: null,
})
