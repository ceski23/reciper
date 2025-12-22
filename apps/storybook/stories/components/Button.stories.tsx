import preview from '#.storybook/preview'
import { Button } from '@repo/ui/components/button'
import { Inline } from '@repo/ui/components/utils'

const SampleIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<rect
			width="18"
			height="18"
			x="3"
			y="3"
			rx="2"
			ry="2"
		/>
		<circle
			cx="9"
			cy="9"
			r="2"
		/>
		<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
	</svg>
)

const meta = preview.meta({
	component: Button,
	argTypes: {
		disabled: {
			control: { type: 'boolean' },
		},
		leftIcon: {
			control: { type: 'select' },
			options: [undefined, 'SampleIcon'],
			mapping: {
				undefined: undefined,
				SampleIcon: SampleIcon,
			},
		},
		render: { control: false },
		className: { control: false },
	},
	args: {
		children: 'Button',
	},
	decorators: [
		Story => (
			<Inline gap={5}>
				<Story />
			</Inline>
		),
	],
})

export const Default = meta.story({
	args: {},
})

export const Variant = meta.story({
	render: args => (
		<>
			<Button
				{...args}
				children="Elevated"
				variant="elevated"
			/>
			<Button
				{...args}
				children="Filled"
				variant="filled"
			/>
			<Button
				{...args}
				children="Tonal"
				variant="tonal"
			/>
			<Button
				{...args}
				children="Outlined"
				variant="outlined"
			/>
			<Button
				{...args}
				children="Text"
				variant="text"
			/>
		</>
	),
})

export const Size = meta.story({
	render: args => (
		<>
			<Button
				{...args}
				children="Extra Small"
				size="extraSmall"
			/>
			<Button
				{...args}
				children="Small"
				size="small"
			/>
			<Button
				{...args}
				children="Medium"
				size="medium"
			/>
			<Button
				{...args}
				children="Large"
				size="large"
			/>
			<Button
				{...args}
				children="Extra Large"
				size="extraLarge"
			/>
		</>
	),
})

export const Shape = meta.story({
	render: args => (
		<>
			<Button
				{...args}
				children="Round"
				shape="round"
			/>
			<Button
				{...args}
				children="Square"
				shape="square"
			/>
		</>
	),
})

export const WithIcon = meta.story({
	render: args => (
		<Button
			{...args}
			children="Button with icon"
			leftIcon={SampleIcon}
		/>
	),
})

export const Disabled = meta.story({
	render: args => (
		<Button
			{...args}
			children="Disabled"
			disabled
		/>
	),
})
