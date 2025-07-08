import * as Ariakit from '@ariakit/react'
import { styled } from '@macaron-css/react'
import { animated, config, useTransition } from '@react-spring/web'
import { type FunctionComponent } from 'react'
import { theme } from 'lib/styles'

type MenuRootProps =
	& Pick<Ariakit.MenuProps, 'gutter' | 'onClose' | 'overflowPadding' | 'children'>
	& Pick<Ariakit.MenuProviderProps, 'placement' | 'open' | 'setOpen'>
	& {
		trigger: Ariakit.MenuButtonOptions['render']
	}

// TODO: Add expand animation as per M3 specs
export const MenuRoot: FunctionComponent<MenuRootProps> = ({
	children,
	trigger,
	gutter = 8,
	onClose,
	open,
	overflowPadding = 8,
	placement = 'bottom-end',
	setOpen,
}) => {
	const menu = Ariakit.useMenuStore()
	const transitions = useTransition(menu.useState('mounted'), {
		from: { opacity: 0, y: -20, scaleY: 0.8 },
		enter: { opacity: 1, y: 0, scaleY: 1 },
		leave: { opacity: 0, y: -20, scaleY: 0.8 },
		config: config.stiff,
	})

	return (
		<Ariakit.MenuProvider
			store={menu}
			placement={placement}
			open={open}
			setOpen={setOpen}
		>
			<Ariakit.MenuButton render={trigger} />
			{transitions((styles, isOpen) =>
				isOpen && (
					<Container
						alwaysVisible
						gutter={gutter}
						overflowPadding={overflowPadding}
						render={<animated.div style={styles} />}
						onClose={onClose}
						portal
					>
						{children}
					</Container>
				)
			)}
		</Ariakit.MenuProvider>
	)
}

const Container = styled(Ariakit.Menu, {
	base: {
		backgroundColor: theme.colors.surfaceContainer,
		borderRadius: 4,
		minWidth: 112,
		maxWidth: 280,
		display: 'flex',
		flexDirection: 'column',
		paddingBlock: 8,
		paddingInline: 0,
		transformOrigin: 'top',
		// TODO: Declare shadow variants in theme
		boxShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
	},
})
