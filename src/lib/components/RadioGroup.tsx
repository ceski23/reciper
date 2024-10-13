import { Radio, RadioGroup as AriakitRadioGroup, RadioProvider, useRadioContext } from '@ariakit/react'
import { useRipples } from '@hooks/useRipples'
import { styled } from '@macaron-css/react'
import type { ComponentProps, FunctionComponent } from 'react'
import { styleUtils, theme } from 'lib/styles'
import { Typography } from './Typography'

type RadioGroupItemProps = {
	label: string
}

export const RadioGroupItem: FunctionComponent<RadioGroupItemProps & ComponentProps<typeof Item>> = ({
	label,
	...props
}) => {
	const { eventHandlers, renderRipples } = useRipples()
	const store = useRadioContext()
	const isSelected = store?.useState<boolean>(x => x.value === props.value)

	return (
		<Container {...eventHandlers}>
			{renderRipples}
			<Item
				{...props}
				render={props => (
					<button
						type="button"
						{...props}
					>
						{isSelected && <Indicator />}
					</button>
				)}
			/>
			<Typography.BodyLarge>
				{label}
			</Typography.BodyLarge>
		</Container>
	)
}

const Container = styled('label', {
	base: {
		display: 'flex',
		gap: 16,
		paddingBlock: 8,
		paddingLeft: 16,
		paddingRight: 24,
		height: 56,
		alignItems: 'center',
		cursor: 'pointer',
		outline: 'none',
		position: 'relative',
		transition: 'background-color .2s',
		':hover': {
			backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.08),
		},
		selectors: {
			'&:focus-within:has(> :focus-visible)': {
				backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.12),
			},
		},
	},
})

// TODO: add hover, focus, active styles
const Item = styled(Radio, {
	base: {
		width: 22,
		height: 22,
		border: `2px solid ${theme.colors.onSurfaceVariant}`,
		background: 'none',
		borderRadius: '50%',
	},
})

const Indicator = styled('span', {
	base: {
		width: 10,
		height: 10,
		backgroundColor: theme.colors.primary,
		borderRadius: '50%',
		display: 'block',
		margin: 4,
	},
})

export const RadioGroup = {
	Provider: RadioProvider,
	Root: AriakitRadioGroup,
	Item: RadioGroupItem,
}
