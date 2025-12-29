import preview from '#.storybook/preview'
import { Skeleton } from '@repo/ui/components/skeleton'
import { Stack, Inline } from '@repo/ui/components/utils'

const meta = preview.meta({
	title: 'Components/Skeleton',
	component: Skeleton,
})

export const Default = meta.story()

export const TextLine = meta.story({
	render: () => (
		<Stack gap={2}>
			<Skeleton __height="1em" />
			<Skeleton __height="1em" />
			<Skeleton
				__height="1em"
				__width="70%"
			/>
		</Stack>
	),
})

export const Avatar = meta.story({
	render: () => (
		<Skeleton
			__width="48px"
			__height="48px"
			borderRadius="50%"
		/>
	),
})

export const Card = meta.story({
	render: () => (
		<Stack gap={4}>
			<Skeleton
				__width="100%"
				__height="200px"
				borderRadius={4}
			/>
			<Stack gap={2}>
				<Skeleton __height="1em" />
				<Skeleton __height="1em" />
				<Skeleton
					__height="1em"
					__width="70%"
				/>
			</Stack>
		</Stack>
	),
})

export const Varied = meta.story({
	render: () => (
		<Stack gap={4}>
			<Stack gap={2}>
				<Skeleton __height="1em" />
				<Skeleton __height="1em" />
				<Skeleton
					__height="1em"
					__width="70%"
				/>
			</Stack>
			<Inline
				gap={2}
				alignItems="flex-start"
			>
				<Skeleton
					__width="48px"
					__height="48px"
					borderRadius="50%"
					flex="none"
				/>
				<Stack
					gap={1}
					flex="1"
				>
					<Skeleton __height="1.2em" />
					<Skeleton
						__height="1em"
						__width="80%"
					/>
				</Stack>
			</Inline>
		</Stack>
	),
})
