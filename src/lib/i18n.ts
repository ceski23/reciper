import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
// @ts-expect-error no types for vite virtual modules
import resources from 'virtual:i18next-loader'
import { settingsStore } from 'lib/stores/settings'

export const initI18n = () => {
	const languageDetector = new LanguageDetector()
	languageDetector.addDetector({
		name: 'settings',
		lookup: () => settingsStore.getState().language,
	})

	settingsStore.effect(() => i18n.isInitialized && i18n.changeLanguage(), ['language'])

	i18n
		.use(initReactI18next)
		.use(languageDetector)
		.init({
			fallbackLng: import.meta.env.DEV ? 'dev' : 'en',
			resources,
			detection: {
				order: ['settings', 'navigator'],
				caches: [],
			},
			debug: import.meta.env.DEV,
		})
}

export const LANGUAGES = {
	en: 'English',
	pl: 'Polski',
}
