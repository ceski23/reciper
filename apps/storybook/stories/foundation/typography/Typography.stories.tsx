import preview from '#.storybook/preview'
import { typography } from '@repo/ui/typography'
import type { ComponentProps } from 'react'

const p = (props: ComponentProps<'p'>) => <p {...props} />

const meta = preview.meta({
	component: p,
	tags: ['!dev'],
})

export const DisplayLarge = meta.story({
	args: {
		children: 'Display Large',
		className: typography({ variant: 'displayLarge' }),
	},
})

export const DisplayMedium = meta.story({
	args: {
		children: 'Display Medium',
		className: typography({ variant: 'displayMedium' }),
	},
})

export const DisplaySmall = meta.story({
	args: {
		children: 'Display Small',
		className: typography({ variant: 'displaySmall' }),
	},
})

export const HeadlineLarge = meta.story({
	args: {
		children: 'Headline Large',
		className: typography({ variant: 'headlineLarge' }),
	},
})

export const HeadlineMedium = meta.story({
	args: {
		children: 'Headline Medium',
		className: typography({ variant: 'headlineMedium' }),
	},
})

export const HeadlineSmall = meta.story({
	args: {
		children: 'Headline Small',
		className: typography({ variant: 'headlineSmall' }),
	},
})

export const TitleLarge = meta.story({
	args: {
		children: 'Title Large',
		className: typography({ variant: 'titleLarge' }),
	},
})

export const TitleMedium = meta.story({
	args: {
		children: 'Title Medium',
		className: typography({ variant: 'titleMedium' }),
	},
})

export const TitleSmall = meta.story({
	args: {
		children: 'Title Small',
		className: typography({ variant: 'titleSmall' }),
	},
})

export const BodyLarge = meta.story({
	args: {
		children: 'Body Large',
		className: typography({ variant: 'bodyLarge' }),
	},
})

export const BodyMedium = meta.story({
	args: {
		children: 'Body Medium',
		className: typography({ variant: 'bodyMedium' }),
	},
})

export const BodySmall = meta.story({
	args: {
		children: 'Body Small',
		className: typography({ variant: 'bodySmall' }),
	},
})

export const LabelLarge = meta.story({
	args: {
		children: 'Label Large',
		className: typography({ variant: 'labelLarge' }),
	},
})

export const LabelMedium = meta.story({
	args: {
		children: 'Label Medium',
		className: typography({ variant: 'labelMedium' }),
	},
})

export const LabelSmall = meta.story({
	args: {
		children: 'Label Small',
		className: typography({ variant: 'labelSmall' }),
	},
})
