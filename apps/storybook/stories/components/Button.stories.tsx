import preview from '#.storybook/preview'
import { ImageIcon } from '#icons'
import { Button } from '@repo/ui/components/button'
import { Inline } from '@repo/ui/components/utils'

const meta = preview.meta({
	component: Button,
	argTypes: {
		disabled: {
			control: { type: 'boolean' },
		},
		leftIcon: {
			control: { type: 'select' },
			options: [undefined, 'ImageIcon'],
			mapping: {
				undefined: undefined,
				ImageIcon: ImageIcon,
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
	args: {
		leftIcon: ImageIcon,
		children: 'Button with icon',
	},
})

export const Disabled = meta.story({
	args: {
		children: 'Disabled',
		disabled: true,
	},
})

export const Link = meta.story({
	args: {
		children: 'Link Button',
		render: <a href="https://google.com" />,
	},
})
