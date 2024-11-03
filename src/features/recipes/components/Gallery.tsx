import 'photoswipe/dist/photoswipe.css'
import * as Ariakit from '@ariakit/react'
import { Skeleton } from '@components/Skeleton'
import { styled } from '@macaron-css/react'
import { useBlocker } from '@tanstack/react-router'
import type PhotoSwipe from 'photoswipe'
import type { EventCallback } from 'photoswipe'
import { type FunctionComponent, Suspense, useCallback, useRef, useState } from 'react'
import React from 'react'
import { GalleryItem } from './GalleryItem'

const PhotoSwipeGallery = React.lazy(() => import('react-photoswipe-gallery').then(module => ({ default: module.Gallery })))

type GalleryProps = {
	images: Array<string>
}

export const Gallery: FunctionComponent<GalleryProps> = ({ images }) => {
	const galleryRef = useRef<PhotoSwipe>()
	const [isGalleryOpen, setIsGalleryOpen] = useState(false)

	useBlocker(() => galleryRef.current?.close(), isGalleryOpen)

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

	return (
		<Suspense
			fallback={(
				<ImagesGrid>
					{Array.from({ length: 6 }, (_, index) => (
						<Skeleton
							key={index}
							style={{ aspectRatio: '1', width: '100%', height: '100%' }}
						/>
					))}
				</ImagesGrid>
			)}
		>
			<PhotoSwipeGallery
				plugins={photoswipe => {
					galleryRef.current = photoswipe.pswp
				}}
				options={{ escKey: !('CloseWatcher' in globalThis) }}
				// onOpen={'CloseWatcher' in globalThis ? handleGalleryOpen : undefined}
				onOpen={handleGalleryOpen}
			>
				<Ariakit.CompositeProvider>
					<ImagesGrid render={<Ariakit.Composite />}>
						{images.map(image => (
							<GalleryItem
								key={image}
								image={image}
							/>
						))}
					</ImagesGrid>
				</Ariakit.CompositeProvider>
			</PhotoSwipeGallery>
		</Suspense>
	)
}

export default Gallery

const ImagesGrid = styled(Ariakit.Role, {
	base: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
		gap: 16,
	},
})
