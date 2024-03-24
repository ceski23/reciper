import 'lib/styles/global'
import 'lib/i18n'
import * as Toast from '@radix-ui/react-toast'
import * as Tooltip from '@radix-ui/react-tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { initI18n } from 'lib/i18n'
import { routes } from 'lib/routing/routes'

initI18n()

const router = createBrowserRouter(routes)
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	(
		<React.StrictMode>
			<HelmetProvider>
				<QueryClientProvider client={queryClient}>
					<Toast.Provider swipeThreshold={100}>
						<Tooltip.Provider disableHoverableContent>
							<RouterProvider router={router} />
						</Tooltip.Provider>
					</Toast.Provider>
				</QueryClientProvider>
			</HelmetProvider>
		</React.StrictMode>
	),
)
