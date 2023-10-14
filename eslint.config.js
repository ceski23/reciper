import config from '@ceski23/eslint-config'

/**
 * @type {Array<import('eslint').Linter.FlatConfig>}
 */
export default [
	{
		ignores: [
			'vite.config.ts',
			'eslint.config.js',
		],
	},
	...config,
]
