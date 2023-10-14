import { Button } from 'lib/components'
import { lightThemeClass } from 'lib/styles'
import { FunctionComponent } from 'react'

export const App: FunctionComponent = () => {
	return (
		<div className={lightThemeClass}>
			<Button type="button">Hello world</Button>
		</div>
	)
}
