import { type QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Navigate } from '@tanstack/react-router'
import { Layout } from 'features/shell/Layout'

type RouterContext = {
	queryClient: QueryClient
	title?: string
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: Layout,
	notFoundComponent: () => (
		<Navigate
			to="/"
			replace
		/>
	),
})
