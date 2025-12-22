import { Box } from '@repo/ui/components/utils'
import preview from '#.storybook/preview'

const meta = preview.meta({
	component: Box,
})

export const Default = meta.story({
	args: {
		children: 'This is a Box component',
	},
})

export const WithMargin = meta.story({
	args: {
		children: 'This Box has margin',
		margin: 10,
	},
})
