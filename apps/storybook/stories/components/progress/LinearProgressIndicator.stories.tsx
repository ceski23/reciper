import preview from '#.storybook/preview.js'
import { ProgressIndicator } from '@repo/ui/components/progress-indicator'
import { Stack } from '@repo/ui/components/utils'

const meta = preview.meta({
	title: 'Components/Progress Indicator/Linear',
	component: ProgressIndicator.Linear,
	argTypes: {
		value: {
			control: { type: 'range', min: 0, max: 100, step: 1 },
		},
		min: {
			control: { type: 'number' },
		},
		max: {
			control: { type: 'number' },
		},
		className: { control: false },
		render: { control: false },
	},
})

export const Default = meta.story({
	args: {
		label: 'Loading...',
		value: 50,
	},
})

export const Value = meta.story({
	args: {
		label: 'Loading...',
		value: 20,
	},
	render: args => (
		<Stack gap={8}>
			<ProgressIndicator.Linear {...args} />
			<ProgressIndicator.Linear
				{...args}
				value={null}
			/>
		</Stack>
	),
})

export const Size = meta.story({
	args: {
		label: 'Loading...',
		value: 20,
	},
	render: args => (
		<Stack gap={8}>
			<ProgressIndicator.Linear
				{...args}
				size="thin"
			/>
			<ProgressIndicator.Linear
				{...args}
				size="thick"
			/>
		</Stack>
	),
})
