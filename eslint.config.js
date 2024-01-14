import config from '@ceski23/eslint-config'

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
		],
	},
	...config,
	{
		rules: {
			'import/no-cycle': 'warn',
			'@typescript-eslint/consistent-type-imports': ['warn', {
				prefer: 'type-imports',
				disallowTypeAnnotations: false,
				fixStyle: 'inline-type-imports',
			}],
		},
	},
]
