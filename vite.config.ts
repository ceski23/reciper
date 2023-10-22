import { macaronVitePlugin } from '@macaron-css/vite'
import react from '@vitejs/plugin-react'
import unpluginSvgComponent from 'unplugin-svg-component/vite'
import { defineConfig } from 'vite'
import i18nextLoader from 'vite-plugin-i18next-loader'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [
		tsconfigPaths(),
		macaronVitePlugin(),
		react(),
		i18nextLoader({
			paths: ['./locales'],
			namespaceResolution: 'basename',
		}),
		unpluginSvgComponent({
			iconDir: 'src/assets/icons',
			dts: true,
			componentName: 'Icon',
			componentStyle: ':',
			scanStrategy: 'text',
		}),
	],
})
