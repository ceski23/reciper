import { useLayoutEffect, useState } from 'react'

type Dimensions = {
	width: number
	height: number
}

export const useImageDimensions = (imageUrl: string): Dimensions | undefined => {
	const [dimensions, setDimensions] = useState<Dimensions>()

	useLayoutEffect(() => {
		const image = new Image()
		image.crossOrigin = `Anonymous`
		image.src = import.meta.env.VITE_CORS_PROXY !== undefined
			? import.meta.env.VITE_CORS_PROXY + encodeURIComponent(imageUrl)
			: imageUrl

		const handleImageLoad = () =>
			setDimensions({
				width: image.naturalWidth,
				height: image.naturalHeight,
			})

		image.addEventListener('load', handleImageLoad, { once: true })

		return () => image.removeEventListener('load', handleImageLoad)
	}, [imageUrl])

	return dimensions
}
