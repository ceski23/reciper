import 'photoswipe/dist/photoswipe.css'
import { Skeleton } from '@components/Skeleton'
import { styled } from '@macaron-css/react'
import { useBlocker } from '@tanstack/react-router'
import type { EventCallback } from 'photoswipe'
import type PhotoSwipe from 'photoswipe'
import React, { type FunctionComponent, Suspense, useCallback, useRef, useState } from 'react'
import { useImageDimensions } from 'lib/hooks/useImageDimensions'

const Gallery = React.lazy(() => import('react-photoswipe-gallery').then(module => ({ default: module.Gallery })))
const Item = React.lazy(() => import('react-photoswipe-gallery').then(module => ({ default: module.Item })))

type RecipeCoverProps = {
	image: string
}

const RecipeCover: FunctionComponent<RecipeCoverProps> = ({ image }) => {
	const galleryRef = useRef<PhotoSwipe>()
	const [isGalleryOpen, setIsGalleryOpen] = useState(false)
	const dimensions = useImageDimensions(image)

	useBlocker(() => galleryRef.current?.close(), isGalleryOpen)

	const handleGalleryOpen = useCallback((photoswipe: PhotoSwipe) => {
		setIsGalleryOpen(true)

		const handleGalleryClose: EventCallback<'closingAnimationStart'> = () => {
			photoswipe.off('closingAnimationStart', handleGalleryClose)
			setIsGalleryOpen(false)
		}

		photoswipe.on('closingAnimationStart', handleGalleryClose)
	}, [])

	return (
		<Suspense fallback={<Skeleton style={{ height: '200px' }} />}>
			<Gallery
				plugins={photoswipe => {
					galleryRef.current = photoswipe.pswp
				}}
				options={{ escKey: !('CloseWatcher' in globalThis) }}
				onOpen={handleGalleryOpen}
			>
				<Item
					original={image}
					thumbnail={image}
					width={dimensions?.width}
					height={dimensions?.height}
					cropped
				>
					{({ ref, open }) => (
						<Image
							ref={ref}
							onClick={open}
							src={image}
						/>
					)}
				</Item>
			</Gallery>
		</Suspense>
	)
}
export default RecipeCover

const Image = styled('img', {
	base: {
		width: '100%',
		height: 200,
		objectFit: 'cover',
		borderRadius: 12,
	},
})
