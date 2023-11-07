import { macaronVitePlugin } from '@macaron-css/vite'
import react from '@vitejs/plugin-react'
import unpluginSvgComponent from 'unplugin-svg-component/vite'
import { defineConfig } from 'vite'
import i18nextLoader from 'vite-plugin-i18next-loader'
import tsconfigPaths from 'vite-tsconfig-paths'
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa'

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
}

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
