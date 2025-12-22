import type { ComponentProps, FunctionComponent } from 'react'
import { visuallyHidden } from './style.css'

export const VisuallyHidden: FunctionComponent<ComponentProps<'span'>> = ({ children, ...props }) => (
	<span
		className={visuallyHidden}
		{...props}
	>
		{children}
	</span>
)
