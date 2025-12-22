import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles'
import { theme } from './theme.css'
import { mapTo } from './utils/functional'

const layout = defineProperties({
	properties: {
		// Layout properties
		display: ['none', 'flex', 'grid', 'block', 'inline', 'inline-flex'],
		visibility: ['hidden', 'visible'],
		flexDirection: ['row', 'column'],
		flexWrap: ['wrap'],
		flexFlow: ['row wrap', 'column wrap'],
		flex: ['1', 'initial', 'auto', 'none'],
		justifyContent: ['stretch', 'flex-start', 'center', 'flex-end', 'space-around', 'space-between'],
		alignItems: ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'],
		placeItems: ['center'],
		textAlign: ['center', 'right'],
		boxSizing: ['border-box'],
		position: ['absolute', 'relative', 'fixed', 'sticky'],
		scrollbarGutter: ['stable'],
		aspectRatio: ['1'],
		overflow: {
			hidden: 'hidden',
			auto: {
				overflow: 'auto',
			},
			overlay: {
				overflow: ['auto', 'overlay'], // in Firefox and IE `overlay` will be ignored and `auto` will be applied
			},
		},
		// Space properties
		...mapTo(
			[
				'padding',
				'paddingLeft',
				'paddingRight',
				'paddingTop',
				'paddingBottom',
				'paddingInline',
				'paddingBlock',
				'margin',
				'marginLeft',
				'marginRight',
				'marginTop',
				'marginBottom',
				'marginInline',
				'marginBlock',
				'gap',
				'rowGap',
				'columnGap',
			],
			{ ...theme.spacing, auto: 'auto', full: '100%' },
		),
		// Size properties
		...mapTo(
			['width', 'maxWidth', 'height', 'maxHeight', 'left', 'top', 'right', 'bottom'],
			['0', '0%', '50%', '100%', 'auto', '100vh', '100vw', '100vmin', '100vmax'],
		),
	},
	shorthands: {
		// Space shorthands
		p: ['padding'],
		pl: ['paddingLeft'],
		pr: ['paddingRight'],
		pt: ['paddingTop'],
		pb: ['paddingBottom'],
		px: ['paddingInline'],
		py: ['paddingBlock'],
		m: ['margin'],
		ml: ['marginLeft'],
		mr: ['marginRight'],
		mt: ['marginTop'],
		mb: ['marginBottom'],
		mx: ['marginInline'],
		my: ['marginBlock'],
		// Size shorthands
		w: ['width'],
		h: ['height'],
	},
})

export const sprinkles = createSprinkles(layout)
export type Sprinkles = Parameters<typeof sprinkles>[0]
