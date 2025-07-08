import config from '@ceski23/eslint-config'
import pluginRouter from '@tanstack/eslint-plugin-router'

/**
 * @type {Array<import('eslint').Linter.FlatConfig>}
 */
export default [
	{
		ignores: [
			'vite.config.ts',
			'eslint.config.js',
			'svg-component.d.ts',
			'generate-colors.ts',
			'vite-env.d.ts',
			'svgSpritePlugin.d.ts',
			'svgSpritePlugin.ts',
			'dist',
		],
	},
	...config,
	...pluginRouter.configs['flat/recommended'],
	{
		rules: {
			'import/no-cycle': 'warn',
			'@typescript-eslint/consistent-type-imports': ['warn', {
				prefer: 'type-imports',
				disallowTypeAnnotations: false,
				fixStyle: 'inline-type-imports',
			}],
			'@typescript-eslint/no-unsafe-return': 'off',
		},
	},
]
