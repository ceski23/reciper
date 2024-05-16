import { styled } from '@macaron-css/react'
import * as RovingFocusGroup from '@radix-ui/react-roving-focus'
import type { FunctionComponent } from 'react'
import { Item } from 'react-photoswipe-gallery'
import { useImageDimensions } from 'lib/hooks/useImageDimensions'

type GalleryItemProps = {
	image: string
}

export const GalleryItem: FunctionComponent<GalleryItemProps> = ({ image }) => {
	const dimensions = useImageDimensions(image)

	return (
		<Item
			original={image}
			thumbnail={image}
			width={dimensions?.width}
			height={dimensions?.height}
			cropped
		>
			{({ ref, open }) => (
				<RovingFocusGroup.Item
					asChild
					key={image}
				>
					<GridItem
						ref={ref}
						onClick={open}
						type="button"
					>
						<ImageThumbnail src={image} />
					</GridItem>
				</RovingFocusGroup.Item>
			)}
		</Item>
	)
}

const GridItem = styled('button', {
	base: {
		border: 'none',
		background: 'none',
		transition: 'scale 0.2s',
		willChange: 'scale',
		cursor: 'zoom-in',
	},
})

const ImageThumbnail = styled('img', {
	base: {
		display: 'block',
		width: '100%',
		aspectRatio: '1',
		borderRadius: 12,
		objectFit: 'cover',
	},
})
