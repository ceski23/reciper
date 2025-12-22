import { Center } from '@repo/ui/components/utils'
import preview from '#.storybook/preview'

const meta = preview.meta({
	component: Center,
})

export const Default = meta.story({
	args: {
		children: <div>Item</div>,
	},
})
