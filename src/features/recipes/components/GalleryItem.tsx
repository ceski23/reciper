import * as Ariakit from '@ariakit/react'
import { styled } from '@macaron-css/react'
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
				<GridItem
					key={image}
					ref={ref}
					onClick={open}
					type="button"
				>
					<ImageThumbnail src={image} />
				</GridItem>
			)}
		</Item>
	)
}

const GridItem = styled(Ariakit.CompositeItem, {
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
