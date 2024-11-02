/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import * as Ariakit from '@ariakit/react'
import { createLink, type LinkComponent } from '@tanstack/react-router'
import { forwardRef } from 'react'

export const LinkBase = forwardRef<HTMLDivElement, Ariakit.RoleProps>(({
	render,
	...props
}, ref) => (
	<Ariakit.Role
		{...props}
		ref={ref}
		render={render ?? <a />}
	/>
))

export const Link: LinkComponent<typeof LinkBase> = createLink(LinkBase)
