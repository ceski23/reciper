import { argbFromHex, hexFromArgb, themeFromSourceColor } from '@material/material-color-utilities'
import fs from 'node:fs/promises'

export const createSchemes = mainColor => {
	const tones = [10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99]
	const theme = themeFromSourceColor(argbFromHex(mainColor))

	const fixedScheme = scheme => Object.fromEntries(Object.entries(scheme.toJSON()).map(([key, value]) => [key, hexFromArgb(value)]))
	const createExtraColors = palette => Object.fromEntries(tones.map(tone => [tone, hexFromArgb(palette.tone(tone))]))

	const palette = {
		neutral: createExtraColors(theme.palettes.neutral),
		error: createExtraColors(theme.palettes.error),
		primary: createExtraColors(theme.palettes.primary),
		secondary: createExtraColors(theme.palettes.secondary),
		tertiary: createExtraColors(theme.palettes.tertiary),
	}

	const dark = {
		...fixedScheme(theme.schemes.dark),
		palette,
	}

	const light = {
		...fixedScheme(theme.schemes.light),
		palette,
	}

	return {
		dark,
		light,
	}
}

await fs.writeFile('src/styles/theme.json', JSON.stringify(createSchemes('#6750A4'), undefined, 2))
