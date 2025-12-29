import preview from '#.storybook/preview.js'
import { IconButton } from '@repo/ui/components/icon-button'
import { Inline } from '@repo/ui/components/utils'

const SampleIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 40 40"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M13.334 30L20 24.917 26.667 30l-2.5-8.25L30.833 17h-8.166L20 8.333 17.334 17H9.167l6.667 4.75-2.5 8.25zM20 36.667c-2.305 0-4.472-.438-6.5-1.313-2.028-.875-3.791-2.062-5.291-3.562-1.5-1.5-2.688-3.264-3.563-5.292S3.333 22.306 3.333 20c0-2.305.438-4.472 1.313-6.5.875-2.028 2.063-3.792 3.563-5.292s3.263-2.687 5.291-3.562c2.028-.875 4.195-1.313 6.5-1.313 2.306 0 4.472.438 6.5 1.313 2.028.875 3.792 2.062 5.292 3.562s2.687 3.264 3.562 5.292 1.313 4.195 1.313 6.5c0 2.306-.438 4.472-1.313 6.5-.875 2.028-2.062 3.792-3.562 5.292s-3.264 2.687-5.292 3.562-4.194 1.313-6.5 1.313z"
			fill="currentColor"
		/>
	</svg>
)

const meta = preview.meta({
	title: 'Components/Icon Button',
	component: IconButton,
	args: {
		label: 'Icon Button',
		icon: SampleIcon,
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
