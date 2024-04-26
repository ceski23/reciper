import { styled } from '@macaron-css/react'
import * as RadixSlider from '@radix-ui/react-slider'
import * as Tooltip from '@radix-ui/react-tooltip'
import { animated, config, useTransition } from '@react-spring/web'
import { type FunctionComponent, useEffect, useMemo, useState } from 'react'
import { Typography } from 'lib/components/Typography'
import { useResizeObserver } from 'lib/hooks/useResizeObserver'
import { styleUtils, theme } from 'lib/styles'

// Copied from: https://github.com/radix-ui/primitives/blob/b32a93318cdfce383c2eec095710d35ffbd33a1c/packages/react/slider/src/Slider.tsx#L749
const linearScale = (input: readonly [number, number], output: readonly [number, number]) => {
	return (value: number) => {
		if (input[0] === input[1] || output[0] === output[1]) return output[0]
		const ratio = (output[1] - output[0]) / (input[1] - input[0])
		return output[0] + ratio * (value - input[0])
	}
}

// Copied from: https://github.com/radix-ui/primitives/blob/b32a93318cdfce383c2eec095710d35ffbd33a1c/packages/react/slider/src/Slider.tsx#L709
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
	...props
}) => {
	const [internalValue, setInternalValue] = useState(value ?? min)
	const [internalOpen, setInternalOpen] = useState(false)
	const transitions = useTransition(internalOpen, {
		from: { opacity: 0, scale: 0, y: 8 },
		enter: { opacity: 1, scale: 1, y: 0 },
		leave: { opacity: 0, scale: 0, y: 8 },
		config: config.stiff,
	})
	const [thumbSize, setThumbSize] = useState(0)
	const measureRef = useResizeObserver<HTMLSpanElement>(({ width }) => setThumbSize(width))
	const currentPercentage = (internalValue - min) / (max - min) * 100
	const thumbOffset = useMemo(() => getThumbInBoundsOffset(thumbSize, currentPercentage, 1), [thumbSize, currentPercentage])

	useEffect(() => {
		value !== undefined && setInternalValue(value)
	}, [value])

	return (
		<Tooltip.Root
			delayDuration={0}
			open={internalOpen}
			onOpenChange={setInternalOpen}
			disableHoverableContent={false}
		>
			<SliderRoot
				value={[internalValue]}
				min={min}
				max={max}
				onValueChange={([newValue]) => {
					onValueChange?.(newValue)
					setInternalValue(newValue)
				}}
				onValueCommit={([newValue]) => onValueCommit?.(newValue)}
				onPointerDown={() => setInternalOpen(true)}
				onPointerUp={() => setInternalOpen(false)}
				{...props}
			>
				<SliderTrack style={{ left: `calc(${currentPercentage}% + 7px + ${thumbOffset}px)` }} />
				<SliderRange style={{ marginRight: `calc(7px - ${thumbOffset}px)` }} />
				<Tooltip.Trigger asChild>
					<SliderThumb
						aria-label={label}
						ref={measureRef}
						onPointerUp={event => {
							event.currentTarget.blur()
						}}
					/>
				</Tooltip.Trigger>
			</SliderRoot>
			{transitions((styles, isOpen) =>
				isOpen && (
					<Tooltip.Portal forceMount>
						<TooltipContent
							side="top"
							align="center"
							sideOffset={8}
							collisionPadding={8}
							style={styles}
							onPointerDownOutside={event => {
								event.preventDefault()
							}}
						>
							<Typography.LabelLarge>
								{renderLabel?.(internalValue) ?? internalValue}
							</Typography.LabelLarge>
						</TooltipContent>
					</Tooltip.Portal>
				)
			)}
		</Tooltip.Root>
	)
}

const SliderRoot = styled(RadixSlider.Root, {
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

const SliderRange = styled(RadixSlider.Range, {
	base: {
		position: 'absolute',
		backgroundColor: theme.colors.primary,
		height: '100%',
		borderRadius: '16px 2px 2px 16px',
		selectors: {
			'&[data-disabled]': {
				opacity: 0.38,
				backgroundColor: theme.colors.onSurface,
			},
		},
	},
})

const SliderTrack = styled(RadixSlider.Track, {
	base: {
		backgroundColor: theme.colors.primaryContainer,
		position: 'absolute',
		flexGrow: 1,
		height: 16,
		right: 0,
		borderRadius: '2px 16px 16px 2px',
		selectors: {
			'&[data-disabled]': {
				backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.12),
			},
		},
	},
})

const SliderThumb = styled(RadixSlider.Thumb, {
	base: {
		display: 'block',
		width: 5,
		height: 44,
		backgroundColor: theme.colors.primary,
		transition: 'width .1s',
		borderRadius: 2,
		selectors: {
			'&:focus-visible:not([data-disabled])': {
				outline: 'none',
				width: 3,
			},
			'&:active:not([data-disabled])': {
				width: 3,
			},
			'&[data-disabled]': {
				opacity: 0.38,
				backgroundColor: theme.colors.onSurface,
			},
		},
	},
})

const TooltipContent = styled(animated(Tooltip.Content), {
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
			'&[data-side="top"]': {
				transformOrigin: 'bottom',
			},
			'&[data-side="bottom"]': {
				transformOrigin: 'top',
			},
		},
	},
})
