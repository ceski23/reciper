import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
// @ts-expect-error no types for vite virtual modules
import resources from 'virtual:i18next-loader'

i18n.use(initReactI18next).init({
	lng: 'en',
	fallbackLng: 'en',
	resources,
})

export default i18n
