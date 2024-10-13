import 'core-js/modules/esnext.set.difference'
import 'core-js/modules/esnext.set.intersection'
import 'lib/styles/global'
import 'lib/i18n'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { routeTree } from 'routeTree.gen'
import { initI18n } from 'lib/i18n'

declare module '@tanstack/react-router' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Register {
		router: typeof router
	}
}

initI18n()

const queryClient = new QueryClient()

const router = createRouter({
	routeTree,
	defaultViewTransition: true,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	(
		<React.StrictMode>
			<HelmetProvider>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
			</HelmetProvider>
		</React.StrictMode>
	),
)
