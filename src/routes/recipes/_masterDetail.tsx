import { TopAppBar } from '@components/TopAppBar'
import { styled } from '@macaron-css/react'
import { mq } from '@styles/utils'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Outlet, useRouteContext } from '@tanstack/react-router'
import { useMediaQuery } from '@uidotdev/usehooks'
import { Fragment } from 'react'
import { recipesQuery } from 'features/recipes/recipes'
import { RecipesContainer } from 'features/recipes/RecipesContainer'

const RouteComponent = () => {
	const isSmallScreen = useMediaQuery(mq.upTo('xl'))
	const title = useRouteContext({
		from: '/recipes/_masterDetail/$id',
		select: ({ title }) => title,
	})
	const { data, isPending } = useQuery(recipesQuery())

	return (
		<Fragment>
			<TopAppBar
				configuration="large"
				onBackClick={() => history.back()}
				title={title}
			/>
			{isSmallScreen ? <Outlet /> : (
				<ColumnsWrapper>
					<RecipesContainer
						recipes={data}
						isLoading={isPending}
					/>
					<Outlet />
				</ColumnsWrapper>
			)}
		</Fragment>
	)
}

export const Route = createFileRoute('/recipes/_masterDetail')({
	component: RouteComponent,
	loader: ({ context }) => {
		context.queryClient.prefetchQuery(recipesQuery())
	},
})

const ColumnsWrapper = styled('div', {
	base: {
		display: 'grid',
		gridTemplateColumns: '446px 1fr',
		gap: 32,
		flex: 1,
		overflow: 'auto',
	},
})
