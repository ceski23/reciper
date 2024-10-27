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

const loadImage = (imageUrl: string, onLoad: (image: HTMLImageElement) => void) => {
	const image = new Image()
	image.crossOrigin = 'Anonymous'
	image.src = import.meta.env.VITE_CORS_PROXY !== undefined
		? import.meta.env.VITE_CORS_PROXY + encodeURIComponent(imageUrl)
		: imageUrl

	image.addEventListener('load', () => onLoad(image), { once: true })
}

export const getColorFromImage = (imageUrl?: string, resizedImageSize = 128) => {
	if (!imageUrl) return Promise.resolve(undefined)

	loadImage(imageUrl, image => {
		colorExtractWorker.postMessage({
			buffer: imageToBuffer(image, resizedImageSize),
			url: imageUrl,
			size: resizedImageSize,
		})
	})

	return new Promise<string>(resolve =>
		colorExtractWorker.addEventListener('message', (event: MessageEvent<ColorExtractWorkerResponse>) => {
			if (event.data.url === imageUrl) resolve(event.data.color)
		}, { once: true })
	)
}
