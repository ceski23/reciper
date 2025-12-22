import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { routeTree } from './routeTree.gen'
import { queryClient } from './query'
import { QueryClientProvider } from '@tanstack/react-query'

export const getRouter = () => {
	const router = createRouter({
		routeTree,
		context: {
			queryClient,
		},
		defaultPreload: 'intent',
		Wrap: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
	})

	setupRouterSsrQueryIntegration({ router, queryClient })

	return router
}
