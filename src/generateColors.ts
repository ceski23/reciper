import {
	argbFromHex,
	type DynamicScheme,
	Hct,
	hexFromArgb,
	MaterialDynamicColors,
	type Scheme,
	SchemeTonalSpot,
	themeFromSourceColor,
	type TonalPalette,
} from '@material/material-color-utilities'

export const createSchemes = (mainColor: string) => {
	const tones = [10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99]
	const theme = themeFromSourceColor(argbFromHex(mainColor))
	const lightScheme = new SchemeTonalSpot(Hct.fromInt(argbFromHex(mainColor)), false, 0)
	const darkScheme = new SchemeTonalSpot(Hct.fromInt(argbFromHex(mainColor)), true, 0)

	const fixedScheme = (scheme: Scheme) => Object.fromEntries(Object.entries(scheme.toJSON()).map(([key, value]) => [key, hexFromArgb(value)]))
	const createExtraColors = (palette: TonalPalette) => Object.fromEntries(tones.map(tone => [tone, hexFromArgb(palette.tone(tone))]))
	const createSurfacesColors = (surfacesP: typeof surfaces, scheme: DynamicScheme) =>
		Object.fromEntries(Object.entries(surfacesP).map(([name, color]) => [name, hexFromArgb(color.getArgb(scheme))]))

	const palette = {
		neutral: createExtraColors(theme.palettes.neutral),
		error: createExtraColors(theme.palettes.error),
		primary: createExtraColors(theme.palettes.primary),
		secondary: createExtraColors(theme.palettes.secondary),
		tertiary: createExtraColors(theme.palettes.tertiary),
	}

	const surfaces = {
		surfaceContainerLowest: MaterialDynamicColors.surfaceContainerLowest,
		surfaceContainerLow: MaterialDynamicColors.surfaceContainerLow,
		surfaceContainer: MaterialDynamicColors.surfaceContainer,
		surfaceContainerHigh: MaterialDynamicColors.surfaceContainerHigh,
		surfaceContainerHighest: MaterialDynamicColors.surfaceContainerHighest,
	}

	const dark = {
		...fixedScheme(theme.schemes.dark),
		...createSurfacesColors(surfaces, darkScheme),
		palette,
	}

	const light = {
		...fixedScheme(theme.schemes.light),
		...createSurfacesColors(surfaces, lightScheme),
		palette,
	}

	return {
		dark,
		light,
	}
}
