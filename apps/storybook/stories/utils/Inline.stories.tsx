import { Inline } from '@repo/ui/components/utils'
import preview from '#.storybook/preview'

const meta = preview.meta({
	component: Inline,
})

export const Default = meta.story({
	args: {
		children: [<div>Item 1</div>, <div>Item 2</div>, <div>Item 3</div>],
	},
})

export const WithGap = meta.story({
	args: {
		children: [<div>Item 1</div>, <div>Item 2</div>, <div>Item 3</div>],
		gap: 10,
	},
})
