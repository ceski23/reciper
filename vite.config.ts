import packageConfig from './package.json'
import { macaronVitePlugin } from '@macaron-css/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import i18nextLoader from 'vite-plugin-i18next-loader'
import tsconfigPaths from 'vite-tsconfig-paths'
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa'
import child from 'node:child_process'
import svgSprite from '@ceski23/vite-plugin-svg-sprite'

const pwaManifest: Partial<ManifestOptions> = {
	short_name: 'Reciper',
	name: 'Reciper - your recipes',
	icons: [
		{
			src: 'pwa-64x64.png',
			sizes: '64x64',
			type: 'image/png',
		},
		{
			src: 'pwa-192x192.png',
			sizes: '192x192',
			type: 'image/png',
		},
		{
			src: 'pwa-512x512.png',
			sizes: '512x512',
			type: 'image/png',
			purpose: 'any',
		},
		{
			src: 'maskable-icon-512x512.png',
			sizes: '512x512',
			type: 'image/png',
			purpose: 'maskable',
		},
	],
	share_target: {
		action: '/recipes/scrape',
		method: 'GET',
		enctype: 'application/x-www-form-urlencoded',
		params: {
			text: 'url',
			url: 'url',
		},
	},
}

export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				manualChunks: id => {
					if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) return 'react'
					if (id.includes('node_modules/@radix-ui/')) return 'radix'
				},
			},
		},
	},
	define: {
		__APP_VERSION__: JSON.stringify(packageConfig.version),
		__COMMIT_HASH__: JSON.stringify(child.execSync('git rev-parse --short HEAD').toString()),
	},
	plugins: [
		tsconfigPaths(),
		macaronVitePlugin(),
		react(),
		i18nextLoader({
			paths: ['./locales'],
			namespaceResolution: 'basename',
		}),
		svgSprite({
			iconsDir: 'src/assets/icons',
			generateDts: true,
		}),
		VitePWA({
			registerType: 'prompt',
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg}'],
				runtimeCaching: [{
					urlPattern: /^https?:\/\/.*?\.(?:jpg|png|gif|webp)/,
					handler: 'StaleWhileRevalidate',
					options: {
						cacheName: 'recipesImages',
						expiration: {
							maxEntries: 100,
						},
					},
				}],
			},
			manifest: pwaManifest,
		}),
	],
})
