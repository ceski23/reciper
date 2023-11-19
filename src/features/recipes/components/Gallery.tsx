import { globalStyle } from '@macaron-css/core'
import { styled } from '@macaron-css/react'
import * as Dialog from '@radix-ui/react-dialog'
import * as RovingFocusGroup from '@radix-ui/react-roving-focus'
import { type FunctionComponent, type KeyboardEventHandler, useCallback, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { theme } from 'lib/styles'

export const Gallery: FunctionComponent = () => {
	const images = Array.from({ length: 9 }, (_, index) => `https://picsum.photos/seed/${index + 1}/500/350`)
	const [openedImageIndex, setOpenedImageIndex] = useState<number>()
	const galleryRef = useRef<HTMLDivElement>(null)

	const handleOpenImage = (index: number) => {
		const elem = galleryRef.current?.children.item(index)?.firstElementChild
		if (!elem || !(elem instanceof HTMLElement)) return

		// @ts-expect-error missing property in CSSStyleDeclaration type
		elem.style.viewTransitionName = 'image'

		document.startViewTransition(() => {
			// @ts-expect-error missing property in CSSStyleDeclaration type
			elem.style.viewTransitionName = ''
			flushSync(() => setOpenedImageIndex(index))
		})
	}

	const handleCloseImage = () => {
		if (openedImageIndex === undefined) return
		const elem = galleryRef.current?.children.item(openedImageIndex)?.firstElementChild
		if (!elem || !(elem instanceof HTMLElement)) return

		document.startViewTransition(() => {
			// @ts-expect-error missing property in CSSStyleDeclaration type
			elem.style.viewTransitionName = 'image'
			flushSync(() => setOpenedImageIndex(undefined))
		}).finished.finally(() => {
			// @ts-expect-error missing property in CSSStyleDeclaration type
			elem.style.viewTransitionName = ''
		})
	}

	const handleKeyDown: KeyboardEventHandler = event => {
		if (openedImageIndex === undefined || !['ArrowLeft', 'ArrowRight'].includes(event.code)) return

		const delta = event.code === 'ArrowLeft' ? -1 : event.code === 'ArrowRight' ? 1 : 0
		const newImageIndex = (((openedImageIndex + delta) % images.length) + images.length) % images.length

		lightboxRef.current?.children.item(newImageIndex)?.scrollIntoView({ behavior: 'smooth' })

		setOpenedImageIndex(newImageIndex)
		event.preventDefault()
	}

	const lightboxRef = useRef<HTMLDivElement | null>(null)
	const prevIndex = useRef<number>()

	const callbackRef = useCallback((node: HTMLDivElement | null) => {
		if (node && prevIndex.current === undefined && openedImageIndex !== undefined) {
			node.children.item(openedImageIndex)?.scrollIntoView()
		}
		lightboxRef.current = node
		prevIndex.current = openedImageIndex
	}, [openedImageIndex])

	return (
		<Dialog.Root
			open={openedImageIndex !== undefined}
			onOpenChange={open => !open && handleCloseImage()}
		>
			<ImagesGrid ref={galleryRef}>
				{images.map((image, index) => (
					<RovingFocusGroup.Item
						asChild
						key={image}
					>
						<GridItem>
							<Image
								src={image}
								onClick={() => handleOpenImage(index)}
							/>
						</GridItem>
					</RovingFocusGroup.Item>
				))}
				<Dialog.Portal>
					<Backdrop />
					<Dialog.Content asChild>
						<LightboxContainer
							ref={callbackRef}
							onKeyDown={handleKeyDown}
							onClick={() => handleCloseImage()}
						>
							{images.map((image, innerIndex) => (
								<SelecteedImage
									key={image}
									src={image}
									style={{
										viewTransitionName: innerIndex === openedImageIndex ? 'image' : undefined,
									}}
								/>
							))}
						</LightboxContainer>
					</Dialog.Content>
				</Dialog.Portal>
			</ImagesGrid>
		</Dialog.Root>
	)
}

const ImagesGrid = styled(RovingFocusGroup.Root, {
	base: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
		gap: 16,
		padding: 16,
	},
})

const GridItem = styled(Dialog.Trigger, {
	base: {
		border: 'none',
		background: 'none',
		transition: 'scale 0.2s',
		willChange: 'scale',
		outline: 'none',
		':hover': {
			scale: 1.1,
		},
		':focus-visible': {
			scale: 1.1,
		},
	},
})

const Image = styled('img', {
	base: {
		display: 'block',
		width: '100%',
		aspectRatio: '1',
		borderRadius: 12,
		cursor: 'pointer',
		objectFit: 'cover',
	},
})

const Backdrop = styled(Dialog.Overlay, {
	base: {
		width: '100vw',
		height: '100vh',
		backgroundColor: theme.colors.scrim,
		opacity: 0.32,
		position: 'fixed',
		inset: 0,
	},
})

const LightboxContainer = styled('div', {
	base: {
		display: 'flex',
		gap: 32,
		position: 'fixed',
		inset: 0,
		overflowX: 'auto',
		scrollSnapType: 'x mandatory',
		alignItems: 'center',
	},
})

const SelecteedImage = styled('img', {
	base: {
		width: '100vw',
		height: 'auto',
		objectFit: 'contain',
		scrollSnapAlign: 'center',
	},
})

globalStyle('::view-transition-new(image)', {
	animation: 'none',
	mixBlendMode: 'normal',
	height: '100%',
	overflow: 'clip',
	objectFit: 'cover',
})

globalStyle('::view-transition-old(image)', {
	animation: 'none',
	mixBlendMode: 'normal',
	height: '100%',
	overflow: 'clip',
	objectFit: 'contain',
})
