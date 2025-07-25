import * as Ariakit from '@ariakit/react'
import { useRipples } from '@hooks/useRipples'
import { styled } from '@macaron-css/react'
import mergeProps from 'merge-props'

export const Ripples = ({
	children,
	...props
}: Ariakit.RoleProps) => {
	const { eventHandlers, renderRipples } = useRipples()

	return (
		<Container
			{...mergeProps(props, eventHandlers)}
		>
			{renderRipples}
			{children}
		</Container>
	)
}

const Container = styled(Ariakit.Role, {
	base: {
		position: 'relative',
	},
})
