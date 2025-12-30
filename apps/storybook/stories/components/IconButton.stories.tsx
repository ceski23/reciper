import preview from '#.storybook/preview.js'
import { StarIcon } from '#icons'
import { IconButton } from '@repo/ui/components/icon-button'
import { Inline } from '@repo/ui/components/utils'

const meta = preview.meta({
	title: 'Components/Icon Button',
	component: IconButton,
	args: {
		label: 'Icon Button',
		icon: StarIcon,
	},
	decorators: [
		Story => (
			<Inline
				gap={5}
				alignItems="center"
			>
				<Story />
			</Inline>
		),
	],
})

export const Default = meta.story({
	args: {},
})

export const Shape = meta.story({
	render: args => (
		<>
			<IconButton
				{...args}
				shape="round"
				label="Round"
			/>
			<IconButton
				{...args}
				shape="square"
				label="Square"
			/>
		</>
	),
})

export const Size = meta.story({
	render: args => (
		<>
			<IconButton
				{...args}
				size="extraSmall"
				label="Extra small"
			/>
			<IconButton
				{...args}
				size="small"
				label="Small"
			/>
			<IconButton
				{...args}
				size="medium"
				label="Medium"
			/>
			<IconButton
				{...args}
				size="large"
				label="Large"
			/>
			<IconButton
				{...args}
				size="extraLarge"
				label="Extra large"
			/>
		</>
	),
})

export const Style = meta.story({
	render: args => (
		<>
			<IconButton
				{...args}
				style="filled"
				label="Filled"
			/>
			<IconButton
				{...args}
				style="tonal"
				label="Tonal"
			/>
			<IconButton
				{...args}
				style="outlined"
				label="Outlined"
			/>
			<IconButton
				{...args}
				style="standard"
				label="Standard"
			/>
		</>
	),
})
export const Width = meta.story({
	render: args => (
		<>
			<IconButton
				{...args}
				width="narrow"
				label="Narrow"
			/>
			<IconButton
				{...args}
				width="default"
				label="Default"
			/>
			<IconButton
				{...args}
				width="wide"
				label="Wide"
			/>
		</>
	),
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
