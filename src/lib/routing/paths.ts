import { route } from 'react-router-typesafe-routes/dom'

export const PATHS = {
	HOME: route(''),
	RECIPES: route('recipes', {}, {
		SEARCH: route('search'),
		NEW: route('new'),
	}),
	SETTINGS: route('settings', {}, {
		ACCOUNT: route('account'),
		UNITS: route('units'),
		ABOUT: route('about'),
		THEME: route('theme'),
	}),
}
