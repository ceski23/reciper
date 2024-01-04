const worker = new Worker(new URL('../imageWorker.ts', import.meta.url), {
	type: 'module',
})

type WorkerResponse = {
	url: string
	color: string
}

export const getColorFromImage = (imageUrl?: string, resizedImageSize = 128) => {
	if (!imageUrl) return

	const handleImageLoad = () => {
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

		worker.postMessage({
			buffer: imageData?.data.buffer,
			url: imageUrl,
		})
	}

	const image = new Image()
	image.crossOrigin = `Anonymous`
	image.src = import.meta.env.VITE_CORS_PROXY !== undefined
		? import.meta.env.VITE_CORS_PROXY + encodeURIComponent(imageUrl)
		: imageUrl

	image.addEventListener('load', handleImageLoad, { once: true })

	return new Promise<string>(resolve =>
		worker.addEventListener('message', (event: MessageEvent<WorkerResponse>) => {
			if (event.data.url === imageUrl) resolve(event.data.color)
		}, { once: true })
	)
}
