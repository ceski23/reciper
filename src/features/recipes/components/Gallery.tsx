import 'photoswipe/dist/photoswipe.css'
import { styled } from '@macaron-css/react'
import * as RovingFocusGroup from '@radix-ui/react-roving-focus'
import type PhotoSwipe from 'photoswipe'
import { type EventCallback } from 'photoswipe'
import { type FunctionComponent, useCallback, useRef, useState } from 'react'
import { Gallery as PhotoSwipeGallery } from 'react-photoswipe-gallery'
import { useBlocker } from 'react-router-dom'
import { GalleryItem } from './GalleryItem'

type GalleryProps = {
	images: Array<string>
}

export const Gallery: FunctionComponent<GalleryProps> = ({ images }) => {
	const galleryRef = useRef<PhotoSwipe>()
	const [isGalleryOpen, setIsGalleryOpen] = useState(false)
	const blocker = useBlocker(isGalleryOpen)

	const handleGalleryOpen = useCallback((photoswipe: PhotoSwipe) => {
		// const closeWatcher = new CloseWatcher()
		// closeWatcher.addEventListener('close', () => photoswipe.close(), { once: true })
		setIsGalleryOpen(true)

		const handleGalleryClose: EventCallback<'closingAnimationStart'> = () => {
			photoswipe.off('closingAnimationStart', handleGalleryClose)
			// closeWatcher.destroy()
			setIsGalleryOpen(false)
		}

		photoswipe.on('closingAnimationStart', handleGalleryClose)
	}, [])

	// useEffect(() => {
	// 	return () => galleryRef.current?.destroy()
	// }, [])

	if (blocker.state === 'blocked') {
		queueMicrotask(() => {
			galleryRef.current?.close()
			blocker.reset()
		})
	}

	return (
		<PhotoSwipeGallery
			plugins={photoswipe => galleryRef.current = photoswipe.pswp}
			options={{ escKey: !('CloseWatcher' in globalThis) }}
			// onOpen={'CloseWatcher' in globalThis ? handleGalleryOpen : undefined}
			onOpen={handleGalleryOpen}
		>
			<ImagesGrid>
				{images.map(image => (
					<GalleryItem
						key={image}
						image={image}
					/>
				))}
			</ImagesGrid>
		</PhotoSwipeGallery>
	)
}

export default Gallery

const ImagesGrid = styled(RovingFocusGroup.Root, {
	base: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
		gap: 16,
	},
})
