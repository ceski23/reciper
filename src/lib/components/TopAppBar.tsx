import { styled } from '@macaron-css/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { type FunctionComponent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { theme } from 'lib/styles'
import { IconButton } from './IconButton'
import { Typography } from './Typography'

type TopAppBarProps = {
	title: string
}

export const TopAppBar: FunctionComponent<TopAppBarProps> = ({ title }) => {
	const navigate = useNavigate()
	const [isMoreOpen, setIsMoreOpen] = useState(false)

	return (
		<AppBarBase>
			<IconButton
				icon="backArrow"
				title="Go back"
				onClick={() => navigate(-1)}
			/>
			<PageTitle as="h1">
				{title}
			</PageTitle>
			<OptionsContainer>
				<DropdownMenu.Root
					open={isMoreOpen}
					onOpenChange={setIsMoreOpen}
				>
					<DropdownMenu.Trigger asChild>
						<IconButton
							icon="more"
							title="More"
							isSelected={isMoreOpen}
						/>
					</DropdownMenu.Trigger>
					<DropdownMenu.Portal>
						<DropdownMenu.Content>
							<DropdownMenu.Item>Test 1</DropdownMenu.Item>
							<DropdownMenu.Item>Test 2</DropdownMenu.Item>
							<DropdownMenu.Item>Test 3</DropdownMenu.Item>
							<DropdownMenu.Item>Test 4</DropdownMenu.Item>
							<DropdownMenu.Item>Test 5</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Portal>
				</DropdownMenu.Root>
			</OptionsContainer>
		</AppBarBase>
	)
}

const AppBarBase = styled('div', {
	base: {
		backgroundColor: theme.colors.surfaceContainer,
		paddingBlock: 8,
		paddingInline: 4,
		width: '100%',
		display: 'grid',
		gridTemplateColumns: '[leading-icon] 48px [title] 1fr [trailing-icons] auto',
		alignItems: 'center',
		gap: 4,
	},
})

const PageTitle = styled(Typography.TitleLarge, {
	base: {
		gridColumn: 'title',
		color: theme.colors.onSurface,
	},
})

const OptionsContainer = styled('div', {
	base: {
		display: 'flex',
	},
})
