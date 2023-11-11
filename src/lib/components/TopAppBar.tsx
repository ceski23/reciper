import { styled } from '@macaron-css/react'
import { type ComponentProps, Fragment, type FunctionComponent, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PATHS } from 'lib/routing/paths'
import { theme } from 'lib/styles'
import { IconButton } from './IconButton'
import { MetaThemeColor } from './MetaThemeColor'
import { ProgressIndicator } from './ProgressIndicator'
import { Typography } from './Typography'

type TopAppBarProps = {
	configuration: 'small' | 'medium' | 'large'
	title: string
	options?: ReactNode
	progress?: {
		value?: number | null | undefined
		max?: number
	} | boolean
	elevation?: ComponentProps<typeof AppBarBase>['elevation']
}

export const TopAppBar: FunctionComponent<TopAppBarProps> = ({ title, configuration, options, progress, elevation }) => {
	const navigate = useNavigate()
	const location = useLocation()

	const handleGoBack = () => {
		if (location.key === 'default') {
			return navigate(PATHS.HOME.buildPath({}))
		}

		navigate(-1)
	}

	return (
		<Fragment>
			<MetaThemeColor isScrolled={elevation === 'onScroll'} />
			<AppBarBase elevation={elevation}>
				<IconButton
					icon="backArrow"
					title="Go back"
					onClick={handleGoBack}
				/>
				{configuration === 'small'
					? (
						<PageTitle asChild>
							<h1>{title}</h1>
						</PageTitle>
					)
					: <span />}
				<OptionsContainer>
					{options}
				</OptionsContainer>
				{configuration === 'large' && (
					<ExtraContent>
						<PageTitleLarge asChild>
							<h1>{title}</h1>
						</PageTitleLarge>
					</ExtraContent>
				)}
			</AppBarBase>
			{progress === true
				? <ProgressIndicator.Linear />
				: progress
				? <ProgressIndicator.Linear {...progress} />
				: undefined}
		</Fragment>
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
		viewTransitionName: 'app-bar-title',
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
		viewTransitionName: 'app-bar-title',
	},
})
