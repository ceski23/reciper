import { Plugin, ViteDevServer } from 'vite'
import fs from 'node:fs/promises'
import path from 'node:path'
import SVGSpriter from 'svg-sprite'

const generateSprite = async (srcDir: string) => {
	const spriter = new SVGSpriter({
		mode: {
			symbol: true,
		},
		svg: {
			xmlDeclaration: false,
			namespaceIDs: false,
			doctypeDeclaration: false,
		},
		shape: {
			transform: [
				{
					svgo: {
						// @ts-expect-error invalid types for svgo plugins
						plugins: [
							'preset-default',
							{
								name: 'convertColors',
								params: {
									currentColor: true,
								},
							},
							'removeXMLNS',
						],
					},
				},
			],
		},
	})

	const files = await fs.readdir(srcDir)
	const svgFiles = await Promise.all(
		files.filter(path => path.endsWith('.svg')).map(async file => {
			const absPath = path.resolve(srcDir, file)
			const content = await fs.readFile(absPath, 'utf-8')

			return [absPath, content]
		}),
	)

	svgFiles.forEach(([filePath, content]) => {
		if (content.length > 0) {
			spriter.add(filePath, null, content)
		}
	})

	return spriter.compileAsync()
}

const generateTypes = async (shapeIds: Array<string>) => {
	await fs.writeFile(
		'./svgSpritePlugin.d.ts',
		/* ts */ `
// Auto-generated file, DO NOT EDIT
declare module 'virtual:svg-sprite' {
	export type SvgSpriteIconName = ${shapeIds.join(' | ')}
	export const icons: Array<SvgSpriteIconName>
	const sprite: string
	export default sprite
}
	`.trim(),
		'utf-8',
	)
}

type SvgSpritePluginOptions = {
	iconsDir: string
	generateDts?: boolean
}

export const svgSprite = async ({ iconsDir, generateDts = false }: SvgSpritePluginOptions): Promise<Plugin> => {
	const virtualModuleId = 'virtual:svg-sprite'
	const resolvedVirtualModuleId = '\0' + virtualModuleId
	let devServer: ViteDevServer
	let outputCache: {
		result: any
		data: any
	}

	const generateAndUpdateCache = async () => {
		outputCache = await generateSprite(iconsDir)

		if (generateDts) {
			const shapeIds = outputCache.data.symbol.shapes.map(shape => `'${shape.name}'`)
			await generateTypes(shapeIds)
		}
	}

	return {
		name: 'svg-sprite-plugin',
		async buildStart() {
			await generateAndUpdateCache()
		},
		async watchChange(id) {
			const relativePath = path.relative(iconsDir, id)

			if (relativePath.startsWith('..') || relativePath.includes(path.sep) || path.isAbsolute(relativePath)) {
				return
			}

			await generateAndUpdateCache()
			await devServer.reloadModule(devServer.moduleGraph.getModuleById(resolvedVirtualModuleId))
		},
		resolveId(id) {
			if (id.startsWith(virtualModuleId)) {
				return '\0' + id
			}
		},
		load(id) {
			if (id === resolvedVirtualModuleId) {
				const shapeIds = outputCache.data.symbol.shapes.map(shape => `'${shape.name}'`)

				if (this.meta.watchMode) {
					return /* js */ `
						export const icons = [${shapeIds.join(', ')}]
						export default '/@svg-sprite'
					`
				}

				const referenceId = this.emitFile({
					type: 'asset',
					name: 'icons.svg',
					source: outputCache.result.symbol.sprite.contents.toString(),
					needsCodeReference: true,
				})

				return /* js */ `
				    export const icons = [${shapeIds.join(', ')}]
				    export default import.meta.ROLLUP_FILE_URL_${referenceId}
				`
			}
		},
		configureServer(server) {
			devServer = server

			server.middlewares.use(async (req, res, next) => {
				let spritePath = `${server.config.base.replace(/\/$/, '')}/@svg-sprite`

				if (req.url === spritePath) {
					res.setHeader('Content-Type', 'image/svg+xml')

					return res.end(outputCache.result.symbol.sprite.contents)
				}

				next()
			})
		},
	}
}
