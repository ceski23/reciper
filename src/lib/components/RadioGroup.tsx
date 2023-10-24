import { styled } from '@macaron-css/react'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { type ComponentProps, type FunctionComponent } from 'react'
import { useRipples } from 'lib/hooks/useRipples'
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
	return (
		<Container {...eventHandlers}>
			{renderRipples}
			<Item {...props}>
				<Indicator />
			</Item>
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
const Item = styled(RadixRadioGroup.Item, {
	base: {
		width: 22,
		height: 22,
		border: `2px solid ${theme.colors.onSurfaceVariant}`,
		background: 'none',
		borderRadius: '50%',
	},
})

const Indicator = styled(RadixRadioGroup.Indicator, {
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
	Root: RadixRadioGroup.Root,
	Item: RadioGroupItem,
}
