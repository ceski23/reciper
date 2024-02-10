import { route, string } from 'react-router-typesafe-routes/dom'

export const PATHS = {
	HOME: route(''),
	RECIPES: route('recipes', {}, {
		SEARCH: route('search'),
		NEW: route('new'),
		SCRAPE: route('scrape', {
			searchParams: {
				url: string(),
			},
		}),
		RECIPE: route(':id'),
	}),
	SETTINGS: route('settings', {}, {
		ACCOUNT: route('account'),
		UNITS: route('units'),
		ABOUT: route('about'),
		THEME: route('theme'),
	}),
	AUTH: route('auth', {}, {
		GOOGLE: route('google'),
	}),
}
