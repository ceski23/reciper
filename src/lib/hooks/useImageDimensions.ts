import { useLayoutEffect, useState } from 'react'

type Dimensions = {
	width: number
	height: number
}

export const useImageDimensions = (imageUrl: string): Dimensions | undefined => {
	const [dimensions, setDimensions] = useState<Dimensions>()

	useLayoutEffect(() => {
		setDimensions(undefined)

		const image = new Image()
		image.crossOrigin = 'Anonymous'
		image.src = import.meta.env.VITE_CORS_PROXY !== undefined
			? import.meta.env.VITE_CORS_PROXY + encodeURIComponent(imageUrl.replace(/ /g, '%20'))
			: imageUrl

		const handleImageLoad = () =>
			setDimensions({
				width: image.naturalWidth,
				height: image.naturalHeight,
			})

		const handleImageError = () => setDimensions(undefined)

		image.addEventListener('load', handleImageLoad, { once: true })
		image.addEventListener('error', handleImageError, { once: true })

		return () => {
			image.removeEventListener('load', handleImageLoad)
			image.removeEventListener('error', handleImageError)
		}
	}, [imageUrl])

	return dimensions
}
