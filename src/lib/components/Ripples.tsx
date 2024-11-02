import * as Ariakit from '@ariakit/react'
import { useRipples } from '@hooks/useRipples'
import { styled } from '@macaron-css/react'
import mergeProps from 'merge-props'
import { forwardRef } from 'react'

export const Ripples = forwardRef<HTMLDivElement, Ariakit.RoleProps>(({
	children,
	...props
}, ref) => {
	const { eventHandlers, renderRipples } = useRipples()

	return (
		<Container
			ref={ref}
			{...mergeProps(props, eventHandlers)}
		>
			{renderRipples}
			{children}
		</Container>
	)
})

const Container = styled(Ariakit.Role, {
	base: {
		position: 'relative',
	},
})
