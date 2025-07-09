import 'lib/styles/global'
import 'lib/i18n'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
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
	scrollRestoration: true,
	// TODO: Enable after fixing transitions in recipes view
	// defaultViewTransition: true,
	defaultPendingMs: 500,
	context: {
		queryClient,
		title: undefined,
	},
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	(
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</React.StrictMode>
	),
)

if ('virtualKeyboard' in navigator) {
	// @ts-expect-error TS doesn't know about this property
	navigator.virtualKeyboard.overlaysContent = true
}
