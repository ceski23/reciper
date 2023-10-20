import { styled } from '@macaron-css/react'
import { useAtomValue } from 'jotai'
import { type FunctionComponent, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isMainScrolledAtom } from 'lib/components/Layout'
import { PATHS } from 'lib/routing/paths'
import { theme } from 'lib/styles'
import { IconButton } from './IconButton'
import { Typography } from './Typography'

type TopAppBarProps = {
	configuration: 'small' | 'medium' | 'large'
	title: string
	options?: ReactNode
}

export const TopAppBar: FunctionComponent<TopAppBarProps> = ({ title, configuration, options }) => {
	const navigate = useNavigate()
	const location = useLocation()
	const isMainScrolled = useAtomValue(isMainScrolledAtom)

	const handleGoBack = () => {
		if (location.key === 'default') {
			return navigate(PATHS.HOME.buildPath({}))
		}

		navigate(-1)
	}

	return (
		<AppBarBase elevation={isMainScrolled ? 'onScroll' : 'flat'}>
			<IconButton
				icon="backArrow"
				title="Go back"
				onClick={handleGoBack}
			/>
			{configuration === 'small'
				? (
					<PageTitle as="h1">
						{title}
					</PageTitle>
				)
				: <span />}
			<OptionsContainer>
				{options}
			</OptionsContainer>
			{configuration === 'large' && (
				<ExtraContent>
					<PageTitleLarge as="h1">{title}</PageTitleLarge>
				</ExtraContent>
			)}
		</AppBarBase>
	)
}

const AppBarBase = styled('div', {
	base: {
		paddingBlock: 8,
		paddingInline: 4,
		width: '100%',
		display: 'grid',
		gridTemplateColumns: '[leading-icon] 48px [title] 1fr [trailing-icons] auto',
		alignItems: 'center',
		gap: 4,
		transition: 'background-color .2s',
	},
	variants: {
		elevation: {
			flat: {
				backgroundColor: theme.colors.surface,
			},
			onScroll: {
				backgroundColor: theme.colors.surfaceContainer,
			},
		},
	},
	defaultVariants: {
		elevation: 'flat',
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

const ExtraContent = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		paddingTop: 36,
		paddingBottom: 28,
		gridColumn: '1 / -1',
	},
})

const PageTitleLarge = styled(Typography.HeadlineMedium, {
	base: {
		color: theme.colors.onSurface,
		paddingInline: 16,
	},
})
