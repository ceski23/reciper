import preview from '#.storybook/preview'
import { Button } from '@repo/ui/components/button'
import { Tooltip } from '@repo/ui/components/tooltip'
import { Inline } from '@repo/ui/components/utils'
import { typography } from '@repo/ui/typography'
import { useState } from 'react'

const meta = preview.meta({
	component: Tooltip<{ text: string }>,
})

export const Default = meta.story({
	args: {
		content: 'Tooltip content',
	},
	render: args => (
		<Tooltip {...args}>
			<Button>Hover me</Button>
		</Tooltip>
	),
})

export const Controlled = meta.story({
	args: {
		content: 'Tooltip content',
	},
	decorators: [
		Story => (
			<Inline
				gap={4}
				alignItems="center"
			>
				<Story />
			</Inline>
		),
	],
	render: args => {
		const [isOpen, setIsOpen] = useState(false)

		return (
			<>
				<Tooltip
					{...args}
					open={isOpen}
				>
					<p className={typography({ variant: 'bodyLarge' })}>Anchor</p>
				</Tooltip>
				<Button onClick={() => setIsOpen(prev => !prev)}>Toggle Tooltip</Button>
			</>
		)
	},
})

export const Position = meta.story({
	args: {
		content: 'I am on the right side',
		side: 'right',
	},
	render: args => (
		<Tooltip {...args}>
			<Button>Hover me</Button>
		</Tooltip>
	),
})

export const Detached = meta.story({
	args: {
		content: 'Detached tooltip content',
	},
	render: args => {
		const [handle] = useState(() => Tooltip.createHandle<{ text: string }>())

		return (
			<>
				<Tooltip
					{...args}
					handle={handle}
				/>
				<Tooltip.Trigger
					handle={handle}
					render={<Button />}
				>
					Hover me
				</Tooltip.Trigger>
			</>
		)
	},
})

export const TriggersWithPayload = meta.story({
	args: {
		content: ({ text }) => 'Payload content: ' + text,
	},
	decorators: [
		Story => (
			<Inline gap={4}>
				<Story />
			</Inline>
		),
	],
	render: args => {
		const [handle] = useState(() => Tooltip.createHandle<{ text: string }>())

		return (
			<>
				<Tooltip
					{...args}
					handle={handle}
				/>
				<Tooltip.Trigger
					handle={handle}
					render={<Button />}
					payload={{ text: 'Content A' }}
				>
					Trigger A
				</Tooltip.Trigger>
				<Tooltip.Trigger
					handle={handle}
					render={<Button />}
					payload={{ text: 'Content B' }}
				>
					Trigger B
				</Tooltip.Trigger>
			</>
		)
	},
})
