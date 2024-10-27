import 'photoswipe/dist/photoswipe.css'
import { Icon } from '@components/Icon'
import { useImageDimensions } from '@hooks/useImageDimensions'
import { styled } from '@macaron-css/react'
import { type FunctionComponent } from 'react'
import { Gallery, Item } from 'react-photoswipe-gallery'

type ImagePreviewProps = {
	image: string
}

export const ImagePreview: FunctionComponent<ImagePreviewProps> = ({ image }) => {
	const dimensions = useImageDimensions(image)

	return dimensions
		? (
			<Gallery>
				<Item
					original={image}
					thumbnail={image}
					cropped
					width={dimensions?.width}
					height={dimensions?.height}
				>
					{({ open, ref }) => (
						<ImageButton
							ref={ref}
							onClick={open}
							type="button"
						>
							<Thumbnail
								src={image}
								width={24}
								height={24}
							/>
						</ImageButton>
					)}
				</Item>
			</Gallery>
		)
		: <FallbackIcon name="image" />
}

export default ImagePreview

const ImageButton = styled('button', {
	base: {
		border: 'none',
		background: 'none',
		padding: 0,
		cursor: 'pointer',
	},
})

const Thumbnail = styled('img', {
	base: {
		display: 'block',
		aspectRatio: '1',
		borderRadius: 4,
		objectFit: 'cover',
	},
})

const FallbackIcon = styled(Icon, {
	base: {
		width: 24,
		height: 24,
	},
})
