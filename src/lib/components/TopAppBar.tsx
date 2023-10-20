import { styled } from '@macaron-css/react'
import { type FunctionComponent, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PATHS } from 'lib/routing/paths'
import { theme } from 'lib/styles'
import { IconButton } from './IconButton'
import { Menu } from './Menu'
import { Typography } from './Typography'

type TopAppBarProps = {
	title: string
}

export const TopAppBar: FunctionComponent<TopAppBarProps> = ({ title }) => {
	const navigate = useNavigate()
	const location = useLocation()
	const [isMoreOpen, setIsMoreOpen] = useState(false)

	const handleGoBack = () => {
		if (location.key === 'default') {
			return navigate(PATHS.HOME.buildPath({}))
		}

		navigate(-1)
	}

	return (
		<AppBarBase>
			<IconButton
				icon="backArrow"
				title="Go back"
				onClick={handleGoBack}
			/>
			<PageTitle as="h1">
				{title}
			</PageTitle>
			<OptionsContainer>
				<Menu.Root
					open={isMoreOpen}
					onOpenChange={setIsMoreOpen}
				>
					<Menu.Trigger asChild>
						<IconButton
							icon="more"
							title="More"
							isSelected={isMoreOpen}
						/>
					</Menu.Trigger>
					<Menu.Content open={isMoreOpen}>
						<Menu.Item text="Test 1" />
						<Menu.Item text="Test 2" />
						<Menu.Item text="Test 3" />
						<Menu.Item text="Test 4" />
						<Menu.Item text="Test 5" />
					</Menu.Content>
				</Menu.Root>
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
