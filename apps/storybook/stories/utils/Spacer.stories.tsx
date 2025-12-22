import { Inline, Spacer } from '@repo/ui/components/utils'
import preview from '#.storybook/preview'

const meta = preview.meta({
	component: Spacer,
})

export const Default = meta.story({
	args: {},
	render: args => (
		<Inline gap={10}>
			<div>Left Item</div>
			<Spacer {...args} />
			<div>Right Item</div>
		</Inline>
	),
})
