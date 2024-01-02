import { styled } from '@macaron-css/react'
import { type FunctionComponent } from 'react'
import { Skeleton } from 'lib/components/Skeleton'

export const RecipeContentSkeleton: FunctionComponent = () => {
	return (
		<ContentContainer>
			<Skeleton style={{ height: '200px' }} />
			<Skeleton style={{ height: '84px' }} />
			<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
				<Skeleton style={{ height: '1em' }} />
				<Skeleton style={{ height: '1em' }} />
				<Skeleton style={{ height: '1em' }} />
				<Skeleton style={{ height: '1em' }} />
				<Skeleton style={{ height: '1em', width: '70%' }} />
			</div>
			<Skeleton style={{ height: '1.5em', width: '50%' }} />
		</ContentContainer>
	)
}

const ContentContainer = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		paddingInline: 16,
		gap: 32,
	},
})
