import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export default defineConfig({
	plugins: [
		vanillaExtractPlugin(),
		devtools({
			editor: {
				name: 'vscode',
				async open(path, lineNumber, columnNumber) {
					const { exec } = await import('node:child_process')
					exec(`code --goto ${path}:${lineNumber}:${columnNumber}`)
				},
			},
		}),
		nitro({ preset: 'bun' }),
		tanstackStart(),
		viteReact({
			babel: {
				plugins: ['babel-plugin-react-compiler'],
			},
		}),
	],
})
