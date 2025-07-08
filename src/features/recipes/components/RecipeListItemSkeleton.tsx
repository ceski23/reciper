import { styled } from '@macaron-css/react'
import type { FunctionComponent } from 'react'
import { Skeleton } from 'lib/components/Skeleton'

export const RecipeListItemSkeleton: FunctionComponent = () => {
	return (
		<Container>
			<Skeleton style={{ width: 56, height: 56, borderRadius: 8 }} />
			<InnerContainer>
				<Skeleton style={{ width: '100%', height: 24, borderRadius: 8 }} />
				<Skeleton style={{ width: '50%', height: 16, borderRadius: 6 }} />
			</InnerContainer>
		</Container>
	)
}

const Container = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'row',
		gap: 16,
		paddingInline: 16,
		paddingBlock: 12,
		height: 84,
	},
})

const InnerContainer = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		gap: 8,
	},
})
