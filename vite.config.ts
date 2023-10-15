import { macaronVitePlugin } from '@macaron-css/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import i18nextLoader from 'vite-plugin-i18next-loader'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [
		tsconfigPaths(),
		macaronVitePlugin(),
		react(),
		svgr(),
		i18nextLoader({
			paths: ['./locales'],
			namespaceResolution: 'basename',
		}),
	],
})
