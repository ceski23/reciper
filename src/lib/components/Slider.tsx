import * as Ariakit from '@ariakit/react'
import { styled } from '@macaron-css/react'
import { animated, config, useTransition } from '@react-spring/web'
import {
	type FunctionComponent,
	type KeyboardEventHandler,
	type PointerEvent,
	type PointerEventHandler,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { Typography } from 'lib/components/Typography'
import { useResizeObserver } from 'lib/hooks/useResizeObserver'
import { styleUtils, theme } from 'lib/styles'
import { clamp, linearScale } from 'lib/utils/math'

/**
 * Offsets the thumb centre point while sliding to ensure it remains
 * within the bounds of the slider when reaching the edges
 */
const getThumbInBoundsOffset = (width: number, left: number, direction: number) => {
	const halfWidth = width / 2
	const halfPercent = 50
	const offset = linearScale([0, halfPercent], [0, halfWidth])

	return (halfWidth - offset(left) * direction) * direction
}

type SliderProps = {
	value?: number
	onValueChange?(value: number): void
	onValueCommit?(value: number): void
	disabled?: boolean
	min: number
	max: number
	step: number
	label: string
	renderLabel?(value: number): string
}

export const Slider: FunctionComponent<SliderProps> = ({
	max,
	min,
	value,
	onValueChange,
	onValueCommit,
	label,
	renderLabel,
	disabled,
	step,
}) => {
	// Tooltip related
	const tooltip = Ariakit.useTooltipStore()
	const currentTooltipPlacement = tooltip.useState('currentPlacement')
	const transitions = useTransition(tooltip.useState('mounted'), {
		from: { opacity: 0, scale: 0, y: 8 },
		enter: { opacity: 1, scale: 1, y: 0 },
		leave: { opacity: 0, scale: 0, y: 8 },
		config: config.stiff,
	})

	// Slider related
	const [internalValue, setInternalValue] = useState(value ?? min)
	const [isHoldingThumb, setIsHoldingThumb] = useState(false)
	const [thumbSize, setThumbSize] = useState(0)
	const sliderRootRef = useRef<HTMLDivElement>(null)
	const thumbRef = useResizeObserver<HTMLDivElement>(({ width }) => setThumbSize(width))
	const getPercentage = useCallback((value: number) => linearScale([min, max], [0, 100])(value), [min, max])
	const thumbOffset = useMemo(() => getThumbInBoundsOffset(thumbSize, getPercentage(internalValue), 1), [thumbSize, getPercentage, internalValue])
	const spaceWidth = 7
	const clampValues = clamp(min, max)

	const convertPositionToValue = (event: PointerEvent<HTMLDivElement>) => {
		const rect = event.currentTarget.getBoundingClientRect()
		const valueFn = linearScale([0, rect.width], [min, max])
		const value = valueFn(event.clientX - rect.left)

		return Math.round(value / step) * step
	}

	const handlePointerDown: PointerEventHandler<HTMLDivElement> = event => {
		if (disabled) return

		event.currentTarget.setPointerCapture(event.pointerId)
		setIsHoldingThumb(true)
		setInternalValue(convertPositionToValue(event))
		tooltip.show()
	}

	const handlePointerUp: PointerEventHandler<HTMLDivElement> = event => {
		if (disabled) return

		event.currentTarget.releasePointerCapture(event.pointerId)
		setIsHoldingThumb(false)
		tooltip.hide()
		onValueCommit?.(internalValue)
	}

	const handlePointerMove: PointerEventHandler<HTMLDivElement> = event => {
		if (!isHoldingThumb || disabled) return

		const newValue = clampValues(convertPositionToValue(event))
		setInternalValue(newValue)
		onValueChange?.(newValue)
		tooltip.render()
	}

	const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = event => {
		const multiplier = event.shiftKey ? 10 : 1

		if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
			// Prevent page scroll
			event.preventDefault()
		}

		if (['ArrowRight', 'ArrowUp'].includes(event.key)) {
			setInternalValue(prev => clampValues(prev + (step * multiplier)))
		}

		if (['ArrowLeft', 'ArrowDown'].includes(event.key)) {
			setInternalValue(prev => clampValues(prev - (step * multiplier)))
		}
	}

	useEffect(() => {
		value !== undefined && setInternalValue(value)
	}, [value])

	return (
		<SliderRoot
			onPointerDown={handlePointerDown}
			onPointerUp={handlePointerUp}
			onPointerMove={handlePointerMove}
			ref={sliderRootRef}
		>
			<SliderTrack
				aria-disabled={disabled}
				style={{ left: `calc(${getPercentage(internalValue)}% + ${spaceWidth}px + ${thumbOffset}px)` }}
			/>
			<SliderRange
				aria-disabled={disabled}
				style={{ marginRight: `calc(${spaceWidth}px - ${thumbOffset}px)`, left: 0, right: `${100 - getPercentage(internalValue)}%` }}
			/>
			<Ariakit.TooltipProvider
				timeout={0}
				placement="top"
				store={tooltip}
				open={disabled ? false : undefined}
			>
				{/* eslint-disable-next-line jsx-a11y/prefer-tag-over-role */}
				<SliderThumb
					ref={thumbRef}
					role="slider"
					aria-label={label}
					aria-valuemin={min}
					aria-valuemax={max}
					aria-valuenow={internalValue}
					disabled={disabled}
					style={{ left: `calc(${getPercentage(internalValue)}% + ${thumbOffset}px)`, transform: 'translateX(-50%)' }}
					onKeyDown={handleKeyDown}
				/>
				{transitions((styles, isOpen) =>
					isOpen && (
						<TooltipContent
							style={styles}
							alwaysVisible
							gutter={8}
							overflowPadding={8}
							hideOnHoverOutside={event => !isHoldingThumb || !(sliderRootRef.current?.contains(event.target as HTMLElement) ?? false)}
							data-placement={currentTooltipPlacement}
						>
							<Typography.LabelLarge>
								{renderLabel?.(internalValue) ?? internalValue}
							</Typography.LabelLarge>
						</TooltipContent>
					)
				)}
			</Ariakit.TooltipProvider>
		</SliderRoot>
	)
}

const SliderRoot = styled('div', {
	base: {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		userSelect: 'none',
		touchAction: 'none',
		width: '100%',
		height: '16px',
	},
})

const SliderRange = styled('div', {
	base: {
		position: 'absolute',
		backgroundColor: theme.colors.primary,
		height: '100%',
		borderRadius: '16px 2px 2px 16px',
		selectors: {
			'&[aria-disabled="true"]': {
				opacity: 0.38,
				backgroundColor: theme.colors.onSurface,
			},
		},
	},
})

const SliderTrack = styled('div', {
	base: {
		backgroundColor: theme.colors.primaryContainer,
		position: 'absolute',
		flexGrow: 1,
		height: 16,
		right: 0,
		borderRadius: '2px 16px 16px 2px',
		selectors: {
			'&[aria-disabled="true"]': {
				backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.12),
			},
		},
	},
})

const SliderThumb = styled(Ariakit.TooltipAnchor, {
	base: {
		display: 'block',
		width: 5,
		height: 44,
		backgroundColor: theme.colors.primary,
		position: 'absolute',
		transition: 'width .1s',
		borderRadius: 2,
		selectors: {
			'&:focus-visible:not([aria-disabled="true"])': {
				outline: 'none',
				width: 3,
			},
			'&:active:not([aria-disabled="true"])': {
				width: 3,
			},
			'&[aria-disabled="true"]': {
				opacity: 0.38,
				backgroundColor: theme.colors.onSurface,
			},
		},
	},
})

const TooltipContent = styled(animated(Ariakit.Tooltip), {
	base: {
		display: 'flex',
		width: 48,
		paddingInline: 16,
		paddingBlock: 12,
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.colors.inverseSurface,
		color: theme.colors.inverseOnSurface,
		selectors: {
			'&[data-placement="top"]': {
				transformOrigin: 'bottom',
			},
			'&[data-placement="bottom"]': {
				transformOrigin: 'top',
			},
		},
	},
})
