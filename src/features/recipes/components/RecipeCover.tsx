import 'photoswipe/dist/photoswipe.css'
import { styled } from '@macaron-css/react'
import { type EventCallback } from 'photoswipe'
import type PhotoSwipe from 'photoswipe'
import { type FunctionComponent, useCallback, useRef, useState } from 'react'
import { Gallery, Item } from 'react-photoswipe-gallery'
import { useBlocker } from 'react-router-dom'
import { useImageDimensions } from 'lib/hooks/useImageDimensions'

type RecipeCoverProps = {
	image: string
}

const RecipeCover: FunctionComponent<RecipeCoverProps> = ({ image }) => {
	const galleryRef = useRef<PhotoSwipe>()
	const [isGalleryOpen, setIsGalleryOpen] = useState(false)
	const blocker = useBlocker(isGalleryOpen)
	const dimensions = useImageDimensions(image)

	const handleGalleryOpen = useCallback((photoswipe: PhotoSwipe) => {
		setIsGalleryOpen(true)

		const handleGalleryClose: EventCallback<'closingAnimationStart'> = () => {
			photoswipe.off('closingAnimationStart', handleGalleryClose)
			setIsGalleryOpen(false)
		}

		photoswipe.on('closingAnimationStart', handleGalleryClose)
	}, [])

	if (blocker.state === 'blocked') {
		queueMicrotask(() => {
			galleryRef.current?.close()
			blocker.reset()
		})
	}

	return (
		<Gallery
			plugins={photoswipe => galleryRef.current = photoswipe.pswp}
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