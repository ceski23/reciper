import 'lib/styles/global'
import 'lib/i18n'
import * as Tooltip from '@radix-ui/react-tooltip'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from 'lib/routing/routes'

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(
	(
		<React.StrictMode>
			<HelmetProvider>
				<Tooltip.Provider disableHoverableContent>
					<RouterProvider router={router} />
				</Tooltip.Provider>
			</HelmetProvider>
		</React.StrictMode>
	),
)
