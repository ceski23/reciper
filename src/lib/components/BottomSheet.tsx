import { styled } from '@macaron-css/react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { type FunctionComponent, type ReactNode, useCallback, useEffect, useState } from 'react'
import { Typography } from 'lib/components/Typography'
import { styleUtils, theme } from 'lib/styles'

export type SheetState = 'open' | 'close' | 'peek'

type BottomSheetProps = {
	state: SheetState
	onStateChange: (state: SheetState) => void
	disableDrag?: boolean
	gap?: number
	children?: ReactNode
	title: string
}

export const BottomSheet: FunctionComponent<BottomSheetProps> = ({
	state,
	onStateChange,
	children,
	disableDrag,
	gap = 100,
	title,
}) => {
	const [sheetHeight, setSheetHeight] = useState(0)
	const [showBackdrop, setShowBackdrop] = useState(false)

	const measuredRef = useCallback((node: HTMLElement | null) => {
		if (node) setSheetHeight(node.getBoundingClientRect().height)
	}, [])

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
		<RadixDialog.Root open={showBackdrop}>
			<RadixDialog.Portal>
				<DialogOverlay style={backdropStyles} />
				<Container
					ref={measuredRef}
					{...bind()}
					style={{ y }}
					onInteractOutside={() => onStateChange('close')}
				>
					<Handle />
					<Content>
						<RadixDialog.Title asChild>
							<Typography.TitleLarge>
								{title}
							</Typography.TitleLarge>
						</RadixDialog.Title>
						{children}
					</Content>
				</Container>
			</RadixDialog.Portal>
		</RadixDialog.Root>
	)
}

const Container = styled(animated(RadixDialog.Content), {
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
	},
})

const Handle = styled('div', {
	base: {
		backgroundColor: theme.colors.outline,
		width: 32,
		height: 4,
		borderRadius: 100,
		margin: 16,
	},
})

const DialogOverlay = styled(animated(RadixDialog.Overlay), {
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
		flex: 1,
		paddingInline: 32,
	},
})
