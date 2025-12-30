import preview from '#.storybook/preview'
import { Chip } from '@repo/ui/components/chip'
import { ImageIcon } from '#icons'
import { Inline } from '@repo/ui/components/utils'
import { ToggleGroup } from '@base-ui/react/toggle-group'

const meta = preview.meta({
	title: 'Components/Chip/Filter',
	component: Chip.Filter,
	argTypes: {
		disabled: {
			control: { type: 'boolean' },
		},
		leadingIcon: {
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
		label: 'Chip',
	},
})

export const Default = meta.story()

export const WithLeadingIcon = meta.story({
	args: {
		label: 'With Icon',
		leadingIcon: ImageIcon,
	},
})

export const Elevated = meta.story({
	args: {
		label: 'Elevated',
		variant: 'elevated',
	},
})

export const Disabled = meta.story({
	args: {
		label: 'Disabled',
		disabled: true,
		pressed: true,
	},
})

export const Pressed = meta.story({
	args: {
		label: 'Pressed',
		pressed: true,
	},
})

export const SingleSelect = meta.story({
	args: {
		label: 'Filter',
	},
	render: () => (
		<ToggleGroup
			render={<Inline gap={2} />}
			defaultValue={['recent']}
		>
			<Chip.Filter
				label="Recent"
				value="recent"
			/>
			<Chip.Filter
				label="Popular"
				value="popular"
			/>
			<Chip.Filter
				label="Trending"
				value="trending"
			/>
			<Chip.Filter
				label="Favorites"
				value="favorites"
			/>
		</ToggleGroup>
	),
})

export const MultiSelect = meta.story({
	args: {
		label: 'Filter',
	},
	render: () => (
		<ToggleGroup
			render={<Inline gap={2} />}
			defaultValue={['recent', 'trending']}
			multiple
		>
			<Chip.Filter
				label="Recent"
				value="recent"
			/>
			<Chip.Filter
				label="Popular"
				value="popular"
			/>
			<Chip.Filter
				label="Trending"
				value="trending"
			/>
			<Chip.Filter
				label="Favorites"
				value="favorites"
			/>
		</ToggleGroup>
	),
})
