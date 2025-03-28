import * as Ariakit from '@ariakit/react'
import { styled } from '@macaron-css/react'
import { animated, useSpring } from '@react-spring/web'
import { mq } from '@styles/utils'
import { useDrag } from '@use-gesture/react'
import { type FunctionComponent, type ReactNode, useCallback, useEffect, useState } from 'react'
import { styleUtils, theme } from 'lib/styles'
import { Typography } from './Typography'

export type SheetState = 'open' | 'close' | 'peek'

type BottomSheetProps = {
	state: SheetState
	onStateChange: (state: SheetState) => void
	disableDrag?: boolean
	gap?: number
	children?: ReactNode
	title: string
	className?: string
}

export const BottomSheet: FunctionComponent<BottomSheetProps> = ({
	state,
	onStateChange,
	children,
	disableDrag,
	gap = 32,
	title,
	className,
}) => {
	const handleHeight = 36
	const [sheetHeight, setSheetHeight] = useState(0)
	const [showBackdrop, setShowBackdrop] = useState(false)
	// eslint-disable-next-line react/hook-use-state
	const [resizeObserver] = useState(() => new ResizeObserver(([entry]) => setSheetHeight(entry.borderBoxSize.at(0)?.blockSize ?? 0 + handleHeight)))

	const measuredRef = useCallback((node: HTMLElement | null) => {
		if (node) {
			resizeObserver.observe(node)
			return
		}

		resizeObserver.disconnect()
	}, [resizeObserver])

	const backdropStyles = useSpring({ opacity: state !== 'close' ? 1 : 0 })
	const [{ y }, api] = useSpring({
		y: 0,
		onStart(result) {
			if (result.value.y !== 0) setShowBackdrop(true)
		},
		onRest(result) {
			if (result.value.y === 0) setShowBackdrop(false)
		},
	}, [])

	const openSheet = useCallback(() => {
		api.start({ y: -sheetHeight + gap, immediate: false })
		onStateChange('open')
	}, [api, gap, onStateChange, sheetHeight])

	const closeSheet = useCallback(() => {
		api.start({ y: 0, immediate: false })
		onStateChange('close')
	}, [api, onStateChange])

	const peekSheet = useCallback(() => {
		api.start({ y: -sheetHeight * 0.4, immediate: false })
		onStateChange('peek')
	}, [api, onStateChange, sheetHeight])

	useEffect(() => {
		switch (state) {
			case 'open':
				openSheet()
				break
			case 'close':
				closeSheet()
				break
			case 'peek':
				peekSheet()
				break
		}
	}, [closeSheet, openSheet, peekSheet, state])

	// eslint-disable-next-line newline-destructuring/newline
	const bind = useDrag(({
		velocity: [, vy],
		offset: [, my],
		direction: [, dy],
		last,
	}) => {
		if (disableDrag) return

		// If finished dragging
		if (last) {
			// If dragged upwards then open sheet
			if (dy < 0) openSheet()
			// If dragged quickly downwards or opened less than 40% of size then close sheet
			else if ((dy > 0 && vy > 0.5) || my > -sheetHeight * 0.4) closeSheet()
			// Open sheet
			else openSheet()
		} else {
			api.start({ y: my, immediate: true })
		}
	}, {
		delay: true,
		from: () => [0, y.get()],
		filterTaps: true,
		bounds: {
			top: -sheetHeight,
		},
	})

	return (
		<Ariakit.Dialog
			open={showBackdrop}
			unmountOnHide
			className={className}
			backdrop={<DialogOverlay style={backdropStyles} />}
			onClose={() => onStateChange('close')}
			render={(
				<Container
					{...bind()}
					style={{ y }}
				>
					<Handle />
					<Content ref={measuredRef}>
						<Ariakit.DialogHeading render={<Title />}>
							{title}
						</Ariakit.DialogHeading>
						{children}
					</Content>
				</Container>
			)}
		/>
	)
}

const Title = styled(Typography.TitleLarge, {
	base: {
		color: theme.colors.onSurface,
	},
})

const Container = styled(animated.div, {
	base: {
		backgroundColor: theme.colors.surfaceContainerLow,
		position: 'fixed',
		bottom: '-100vh',
		left: 0,
		right: 0,
		height: '100vh',
		touchAction: 'none',
		borderRadius: '28px 28px 0 0',
		overflow: 'hidden',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		'@media': {
			[mq.atLeast('md')]: {
				left: '50%',
				translate: '-50% 0',
			},
		},
	},
})

const Handle = styled('div', {
	base: {
		backgroundColor: theme.colors.outline,
		width: 32,
		height: 4,
		borderRadius: 100,
		margin: 16,
		cursor: 'ns-resize',
	},
})

const DialogOverlay = styled(animated.div, {
	base: {
		width: '100vw',
		height: '100vh',
		backgroundColor: styleUtils.transparentize(theme.colors.scrim, 0.32),
		position: 'fixed',
		inset: 0,
	},
})

const Content = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		paddingInline: 32,
		paddingBottom: 120,
	},
})
