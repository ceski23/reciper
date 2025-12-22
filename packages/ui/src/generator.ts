import {
	argbFromHex,
	DynamicScheme,
	Hct,
	hexFromArgb,
	SpecVersion,
	Variant,
	type TonalPalette,
} from '@materialx/material-color-utilities'

type ExtractValues<T, U> = {
	[K in keyof T as T[K] extends U ? K : never]: T[K]
}

const colorsFromTonalPalette = (palette: TonalPalette) =>
	Object.fromEntries(
		[10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99].map(tone => [tone, hexFromArgb(palette.tone(tone))]),
	)

const more = (scheme: DynamicScheme, keys: Array<keyof ExtractValues<DynamicScheme, number>>) =>
	Object.fromEntries(keys.map(key => [key, hexFromArgb(scheme[key])]))

const createDynamicScheme = (mainColor: string, isDark: boolean) => {
	const scheme = DynamicScheme.from({
		isDark,
		sourceColorHct: Hct.fromInt(argbFromHex(mainColor)),
		specVersion: SpecVersion.SPEC_2021,
		variant: Variant.VIBRANT,
	})

	const palette = {
		neutral: colorsFromTonalPalette(scheme.neutralPalette),
		error: colorsFromTonalPalette(scheme.errorPalette),
		primary: colorsFromTonalPalette(scheme.primaryPalette),
		secondary: colorsFromTonalPalette(scheme.secondaryPalette),
		tertiary: colorsFromTonalPalette(scheme.tertiaryPalette),
	}

	return {
		...more(scheme, [
			'primary',
			'onPrimary',
			'primaryContainer',
			'onPrimaryContainer',
			'secondary',
			'onSecondary',
			'secondaryContainer',
			'onSecondaryContainer',
			'tertiary',
			'onTertiary',
			'tertiaryContainer',
			'onTertiaryContainer',
			'error',
			'onError',
			'errorContainer',
			'onErrorContainer',
			'background',
			'onBackground',
			'surface',
			'onSurface',
			'surfaceVariant',
			'onSurfaceVariant',
			'outline',
			'outlineVariant',
			'shadow',
			'scrim',
			'inverseSurface',
			'inverseOnSurface',
			'inversePrimary',
			'surfaceContainerLowest',
			'surfaceContainerLow',
			'surfaceContainer',
			'surfaceContainerHigh',
			'surfaceContainerHighest',
		]),
		palette,
	}
}

export const generateTheme = (mainColor: string) => ({
	light: createDynamicScheme(mainColor, false),
	dark: createDynamicScheme(mainColor, true),
})
