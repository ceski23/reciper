import 'core-js/modules/esnext.set.difference'
import 'core-js/modules/esnext.set.intersection'
import 'lib/styles/global'
import 'lib/i18n'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { initI18n } from 'lib/i18n'
import { router } from 'lib/router'

initI18n()

const queryClient = new QueryClient()

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
