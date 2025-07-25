import { rgbaToThumbHash } from 'thumbhash'

const colorExtractWorker = new Worker(new URL('../colorExtractWorker.ts', import.meta.url), {
	type: 'module',
})

export type ColorExtractWorkerResponse = {
	url: string
	color: string
}

const imageToBuffer = (image: HTMLImageElement, resizedImageSize: number) => {
	const sizeRatio = image.width / image.height
	const { targetWidth, targetHeight } = image.width > image.height
		? {
			targetWidth: resizedImageSize,
			targetHeight: resizedImageSize / sizeRatio,
		}
		: {
			targetWidth: resizedImageSize * sizeRatio,
			targetHeight: resizedImageSize,
		}
	const canvas = new OffscreenCanvas(targetWidth, targetHeight)
	const context = canvas.getContext('2d')
	context?.drawImage(image, 0, 0, targetWidth, targetHeight)
	const imageData = context?.getImageData(0, 0, targetWidth, targetHeight)

	return imageData?.data.buffer
}

const loadImage = async (imageUrl: string): Promise<HTMLImageElement> => {
	const image = new Image()
	image.crossOrigin = 'Anonymous'
	image.src = import.meta.env.VITE_CORS_PROXY !== undefined
		? import.meta.env.VITE_CORS_PROXY + encodeURIComponent(imageUrl.replace(/ /g, '%20'))
		: imageUrl

	return new Promise((resolve, reject) => {
		image.addEventListener('load', () => resolve(image), { once: true })
		image.addEventListener('error', () => reject(), { once: true })
	})
}

export const getColorFromImage = async (imageUrl?: string, resizedImageSize = 128) => {
	if (!imageUrl) return

	colorExtractWorker.postMessage({
		buffer: imageToBuffer(await loadImage(imageUrl), resizedImageSize),
		url: imageUrl,
		size: resizedImageSize,
	})

	return new Promise<string>(resolve =>
		colorExtractWorker.addEventListener('message', (event: MessageEvent<ColorExtractWorkerResponse>) => {
			if (event.data.url === imageUrl) resolve(event.data.color)
		}, { once: true })
	)
}

const bufferToBase64 = async (buffer: Uint8Array) => {
	const base64url = await new Promise<string>(r => {
		const reader = new FileReader()
		reader.onload = () => r(reader.result as string)
		reader.readAsDataURL(new Blob([buffer]))
	})

	return base64url.slice(base64url.indexOf(',') + 1)
}

export const generateThumbhash = async (imageUrl: string) => {
	const data = imageToBuffer(await loadImage(imageUrl), 64)

	if (!data) return null

	return bufferToBase64(rgbaToThumbHash(64, 64, new Uint8ClampedArray(data)))
}
