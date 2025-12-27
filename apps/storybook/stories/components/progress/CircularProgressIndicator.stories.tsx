import preview from '#.storybook/preview.js'
import { ProgressIndicator } from '@repo/ui/components/progress-indicator'
import { Inline } from '@repo/ui/components/utils'

const circularMeta = preview.meta({
	title: 'Components/Progress Indicator/Circular',
	component: ProgressIndicator.Circular,
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
	},
	args: {
		style: { width: 50, height: 50 },
	},
})

export const Default = circularMeta.story({
	args: {
		label: 'Loading...',
		value: 50,
	},
})

export const Sizes = circularMeta.story({
	args: {
		label: 'Loading...',
		value: 50,
	},
	render: args => (
		<Inline gap={4}>
			<ProgressIndicator.Circular
				{...args}
				size="thin"
			/>
			<ProgressIndicator.Circular
				{...args}
				size="thick"
			/>
		</Inline>
	),
})

export const Values = circularMeta.story({
	args: {
		label: 'Loading...',
		value: 0,
	},
	render: args => (
		<Inline gap={4}>
			<ProgressIndicator.Circular
				{...args}
				value={null}
			/>
			<ProgressIndicator.Circular
				{...args}
				value={0}
			/>
			<ProgressIndicator.Circular
				{...args}
				value={20}
			/>
			<ProgressIndicator.Circular
				{...args}
				value={40}
			/>
			<ProgressIndicator.Circular
				{...args}
				value={60}
			/>
			<ProgressIndicator.Circular
				{...args}
				value={80}
			/>
			<ProgressIndicator.Circular
				{...args}
				value={100}
			/>
		</Inline>
	),
})
