import 'lib/styles/global'
import 'lib/i18n'
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
				<RouterProvider router={router} />
			</HelmetProvider>
		</React.StrictMode>
	),
)
