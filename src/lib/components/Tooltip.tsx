import { styled } from '@macaron-css/react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { animated, config, useTransition } from '@react-spring/web'
import { type ComponentPropsWithoutRef, type FunctionComponent, useEffect, useState } from 'react'
import { theme } from 'lib/styles'
import { Typography } from './Typography'

export const Tooltip: FunctionComponent<
	ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>
> = ({
	children,
	content,
	open,
	defaultOpen,
	onOpenChange,
	side = 'top',
	align = 'center',
	sideOffset = 8,
	collisionPadding = 8,
	...props
}) => {
	const [internalOpen, setInternalOpen] = useState(defaultOpen)
	const transitions = useTransition(internalOpen, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		config: config.stiff,
	})

	useEffect(() => {
		setInternalOpen(open)
	}, [open])

	return (
		<TooltipPrimitive.Root
			open={internalOpen}
			defaultOpen={defaultOpen}
			onOpenChange={open => {
				setInternalOpen(open)
				onOpenChange?.(open)
			}}
		>
			<TooltipPrimitive.Trigger asChild>
				{children}
			</TooltipPrimitive.Trigger>
			{transitions((styles, isOpen) =>
				isOpen && (
					<TooltipPrimitive.Portal forceMount>
						<Content
							side={side}
							align={align}
							sideOffset={sideOffset}
							style={styles}
							collisionPadding={collisionPadding}
							{...props}
						>
							<Typography.BodySmall>
								{content}
							</Typography.BodySmall>
						</Content>
					</TooltipPrimitive.Portal>
				)
			)}
		</TooltipPrimitive.Root>
	)
}

const Content = styled(animated(TooltipPrimitive.Content), {
	base: {
		display: 'flex',
		paddingInline: 8,
		paddingBlock: 4,
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.colors.inverseSurface,
		color: theme.colors.inverseOnSurface,
	},
})
