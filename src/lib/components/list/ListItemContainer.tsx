import { Role } from '@ariakit/react'
import { styled } from '@macaron-css/react'
import { styleUtils, theme } from 'lib/styles'

export const ListItemContainer = styled(Role.div, {
	base: {
		display: 'flex',
		paddingLeft: 16,
		paddingRight: 24,
		gap: 16,
		backgroundColor: 'unset',
		border: 'none',
		transition: 'background-color .2s',
		textAlign: 'start',
		textDecoration: 'none',
		color: theme.colors.onSurface,
		width: '100%',
	},
	variants: {
		size: {
			'2line': {
				alignItems: 'center',
				paddingBlock: 8,
			},
			'3line': {
				paddingBlock: 12,
			},
		},
		variant: {
			clickable: {
				cursor: 'pointer',
				outline: 'none',
				':hover': {
					backgroundColor: styleUtils.transparentize(theme.colors.primary, 0.08),
				},
				':focus-visible': {
					backgroundColor: styleUtils.transparentize(theme.colors.primary, 0.12),
				},
			},
			nonClickable: {},
			disabled: {
				opacity: 0.3,
			},
		},
	},
	defaultVariants: {
		size: '2line',
		variant: 'nonClickable',
	},
})
