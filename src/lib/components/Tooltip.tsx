import * as Ariakit from '@ariakit/react'
import { styled } from '@macaron-css/react'
import { animated, config, useTransition } from '@react-spring/web'
import { type FunctionComponent, type ReactElement } from 'react'
import { theme } from 'lib/styles'
import { typography } from './Typography'

type TooltipProps =
	& Pick<Ariakit.TooltipProps, 'gutter' | 'onClose' | 'overflowPadding'>
	& Pick<Ariakit.TooltipProviderProps, 'placement' | 'timeout' | 'open' | 'setOpen'>
	& {
		content: string
		children: ReactElement
	}

export const Tooltip: FunctionComponent<TooltipProps> = ({
	children,
	content,
	gutter = 8,
	onClose,
	overflowPadding = 8,
	placement = 'top',
	timeout = 500,
	open,
	setOpen,
}) => {
	const tooltip = Ariakit.useTooltipStore()
	const transitions = useTransition(tooltip.useState('mounted'), {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		config: config.stiff,
	})

	return (
		<Ariakit.TooltipProvider
			store={tooltip}
			placement={placement}
			timeout={timeout}
			hideTimeout={timeout}
			open={open}
			setOpen={setOpen}
		>
			<Ariakit.TooltipAnchor render={children} />
			{transitions((styles, isOpen) =>
				isOpen && (
					<Ariakit.Tooltip
						alwaysVisible
						gutter={gutter}
						onClose={onClose}
						overflowPadding={overflowPadding}
						render={(
							<Content
								style={styles}
								className={typography.bodySmall}
							>
								{content}
							</Content>
						)}
					/>
				)
			)}
		</Ariakit.TooltipProvider>
	)
}

const Content = styled(animated.div, {
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
