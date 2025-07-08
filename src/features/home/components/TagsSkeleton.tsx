import { Skeleton } from '@components/Skeleton'
import { styled } from '@macaron-css/react'
import { type FunctionComponent } from 'react'

export const TagsSkeleton: FunctionComponent = ({}) => {
	return (
		<TagsContainer>
			<Skeleton style={{ minWidth: 130, height: 32, borderRadius: 8, flex: '1 0 auto' }} />
			<Skeleton style={{ minWidth: 175, height: 32, borderRadius: 8, flex: '1 0 auto' }} />
			<Skeleton style={{ minWidth: 70, height: 32, borderRadius: 8, flex: '1 0 auto' }} />
			<Skeleton style={{ minWidth: 85, height: 32, borderRadius: 8, flex: '1 0 auto' }} />
			<Skeleton style={{ minWidth: 100, height: 32, borderRadius: 8, flex: '1 0 auto' }} />
			<Skeleton style={{ minWidth: 120, height: 32, borderRadius: 8, flex: '1 0 auto' }} />
			<Skeleton style={{ minWidth: 55, height: 32, borderRadius: 8, flex: '1 0 auto' }} />
			<Skeleton style={{ minWidth: 100, height: 32, borderRadius: 8, flex: '1 0 auto' }} />
			<Skeleton style={{ minWidth: 150, height: 32, borderRadius: 8, flex: '1 0 auto' }} />
			<Skeleton style={{ minWidth: 90, height: 32, borderRadius: 8, flex: '1 0 auto' }} />
			<Skeleton style={{ minWidth: 50, height: 32, borderRadius: 8, flex: '1 0 auto' }} />
		</TagsContainer>
	)
}

const TagsContainer = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
})
