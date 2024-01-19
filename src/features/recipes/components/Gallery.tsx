import 'photoswipe/dist/photoswipe.css'
import { styled } from '@macaron-css/react'
import * as RovingFocusGroup from '@radix-ui/react-roving-focus'
import type PhotoSwipe from 'photoswipe'
import { type EventCallback } from 'photoswipe'
import { type FunctionComponent, useCallback, useEffect, useRef } from 'react'
import { Gallery as PhotoSwipeGallery } from 'react-photoswipe-gallery'
import { GalleryItem } from './GalleryItem'

type GalleryProps = {
	images: Array<string>
}

export const Gallery: FunctionComponent<GalleryProps> = ({ images }) => {
	const galleryRef = useRef<PhotoSwipe>()

	const handleGalleryOpen = useCallback((photoswipe: PhotoSwipe) => {
		const closeWatcher = new CloseWatcher()
		closeWatcher.addEventListener('close', () => photoswipe.close(), { once: true })

		const handleGalleryClose: EventCallback<'closingAnimationStart'> = () => {
			photoswipe.off('closingAnimationStart', handleGalleryClose)
			closeWatcher.destroy()
		}

		photoswipe.on('closingAnimationStart', handleGalleryClose)
	}, [])

	useEffect(() => {
		return () => galleryRef.current?.destroy()
	}, [])

	return (
		<PhotoSwipeGallery
			plugins={photoswipe => galleryRef.current = photoswipe.pswp}
			options={{ escKey: !('CloseWatcher' in globalThis) }}
			onOpen={'CloseWatcher' in globalThis ? handleGalleryOpen : undefined}
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

const ImagesGrid = styled(RovingFocusGroup.Root, {
	base: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
		gap: 16,
	},
})
