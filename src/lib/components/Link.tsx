/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import * as Ariakit from '@ariakit/react'
import { createLink, type LinkComponent } from '@tanstack/react-router'

const LinkBase = ({
	render,
	...props
}: Ariakit.RoleProps) => (
	<Ariakit.Role
		{...props}
		render={render ?? <a />}
	/>
)

export const Link: LinkComponent<typeof LinkBase> = createLink(LinkBase)
