import { defineMain } from '@storybook/react-vite/node'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
const getAbsolutePath = (value: string): any => dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))

export default defineMain({
	stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		getAbsolutePath('@storybook/addon-a11y'),
		getAbsolutePath('@storybook/addon-docs'),
		getAbsolutePath('@vueless/storybook-dark-mode'),
		getAbsolutePath('@storybook/addon-mcp'),
	],
	framework: getAbsolutePath('@storybook/react-vite'),
	typescript: {
		skipCompiler: true,
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldExtractValuesFromUnion: true,
			shouldRemoveUndefinedFromOptional: true,
			propFilter: prop => {
				if (['disabled', 'min', 'max'].includes(prop.name)) {
					return true
				}
				return prop.parent ? !/node_modules/.test(prop.parent.fileName) : true
			},
		},
	},
	features: {
		experimentalComponentsManifest: true,
		experimentalCodeExamples: true,
	},
})
