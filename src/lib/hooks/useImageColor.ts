import { useEffect, useState } from 'react'

const worker = new Worker(new URL('../imageWorker.ts', import.meta.url), {
	type: 'module',
})

type WorkerResponse = {
	url: string
	color: string
}

export const useImageColor = (imageUrl: string, resizedImageSize = 128) => {
	const [color, setColor] = useState<string>()

	useEffect(() => {
		const handleMessage = (event: MessageEvent<WorkerResponse>) => {
			if (event.data.url === imageUrl) setColor(event.data.color)
		}

		worker.addEventListener('message', handleMessage)

		return () => worker.removeEventListener('message', handleMessage)
	}, [imageUrl])

	useEffect(() => {
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

		image.addEventListener('load', handleImageLoad)

		return () => image.removeEventListener('load', handleImageLoad)
	}, [imageUrl, resizedImageSize])

	return color
}
