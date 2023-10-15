import { useContext } from 'react'
import { UNSAFE_NavigationContext, useLocation, useResolvedPath } from 'react-router-dom'

export const useIsLinkActive = (to: string, end?: boolean) => {
	// Based on: https://github.com/remix-run/react-router/blob/7ce38dc49ee997706902ac2d033ba1fd683cfed0/packages/react-router-dom/index.tsx#L642-L668
	const { navigator } = useContext(UNSAFE_NavigationContext)
	const path = useResolvedPath(to)
	const location = useLocation()
	const locationPathname = location.pathname
	const toPathname = navigator.encodeLocation
		? navigator.encodeLocation(path).pathname
		: path.pathname
	const isActive = locationPathname === toPathname
		|| (!end
			&& locationPathname.startsWith(toPathname)
			&& locationPathname.charAt(toPathname.length) === '/')

	return isActive
}
