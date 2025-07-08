import { Skeleton } from '@components/Skeleton'
import { type FunctionComponent } from 'react'

export const RecipeCardSkeleton: FunctionComponent = ({}) => {
	return (
		<div>
			<Skeleton style={{ width: 220, height: 250, borderRadius: 8 }} />
		</div>
	)
}
