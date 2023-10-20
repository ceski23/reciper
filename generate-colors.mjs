import { argbFromHex, Hct, hexFromArgb, MaterialDynamicColors, SchemeTonalSpot, themeFromSourceColor } from '@material/material-color-utilities'
import fs from 'node:fs/promises'

/**
 * Generates colors schemes based on main color
 * @param {string} mainColor
 * @returns
 */
export const createSchemes = mainColor => {
	const tones = [10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99]
	const theme = themeFromSourceColor(argbFromHex(mainColor))
	const lightScheme = new SchemeTonalSpot(Hct.fromInt(argbFromHex(mainColor)), false, 0)
	const darkScheme = new SchemeTonalSpot(Hct.fromInt(argbFromHex(mainColor)), true, 0)

	const fixedScheme = scheme => Object.fromEntries(Object.entries(scheme.toJSON()).map(([key, value]) => [key, hexFromArgb(value)]))
	const createExtraColors = palette => Object.fromEntries(tones.map(tone => [tone, hexFromArgb(palette.tone(tone))]))
	const createSurfacesColors = (surfaces, scheme) =>
		Object.fromEntries(Object.entries(surfaces).map(([name, color]) => [name, hexFromArgb(color.getArgb(scheme))]))

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

await fs.writeFile('src/lib/styles/theme.json', JSON.stringify(createSchemes('#0088cc'), undefined, '\t'))
