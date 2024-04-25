import { styled } from '@macaron-css/react'
import { animated } from '@react-spring/web'
import { useNavigate } from '@tanstack/react-router'
import { type ComponentProps, Fragment, type FunctionComponent, type ReactNode, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { Skeleton } from 'lib/components/Skeleton'
import { useIsContainerScrolled } from 'lib/hooks/useIsContainerScrolled'
import { uiStore } from 'lib/stores/ui'
import { theme } from 'lib/styles'
import { AnimatedTitle } from './AnimatedTitle'
import { IconButton } from './IconButton'
import { ProgressIndicator } from './ProgressIndicator'
import { Typography } from './Typography'

type TopAppBarProps = {
	configuration: 'small' | 'medium' | 'large'
	title?: string
	options?: ReactNode
	progress?: {
		value?: number | null | undefined
		max?: number
	} | boolean
	container?: HTMLElement | null
	elevation?: ComponentProps<typeof AppBarBase>['elevation']
}

export const TopAppBar: FunctionComponent<TopAppBarProps> = ({
	title,
	configuration,
	options,
	progress,
	elevation,
	container,
}) => {
	const { t } = useTranslation()
	const [isContentScrolled, setIsContentScrolled] = useState(false)
	const renderProbe = useIsContainerScrolled(setIsContentScrolled)
	const { state: { mainContent } } = uiStore.useStore('mainContent')
	const navigate = useNavigate()
	const themeColor = useMemo(() => {
		const tempElement = document.createElement('div')
		tempElement.style.backgroundColor = isContentScrolled || elevation === 'onScroll' ? theme.colors.surfaceContainer : theme.colors.surface
		document.documentElement.append(tempElement)

		const color = window.getComputedStyle(tempElement).backgroundColor
		tempElement.remove()

		return color
	}, [isContentScrolled, elevation])
	const scrollContainer = container ?? mainContent

	return (
		<Fragment>
			{renderProbe}
			<HeaderPortal>
				<Helmet>
					<meta
						name="theme-color"
						content={themeColor}
					/>
				</Helmet>
				<AppBarBase elevation={elevation ?? (isContentScrolled ? 'onScroll' : 'flat')}>
					<IconButton
						icon="backArrow"
						title={t('navigation.goBack')}
						onClick={() => navigate({ to: '../' })}
					/>
					{scrollContainer && (
						<PageTitle asChild>
							<AnimatedTitle
								container={scrollContainer}
								shouldAnimate={configuration === 'large'}
								style={{ viewTransitionName: isContentScrolled || configuration !== 'large' ? 'app-bar-title' : undefined }}
								reverse
							>
								{title}
							</AnimatedTitle>
						</PageTitle>
					)}
					<OptionsContainer>
						{options}
					</OptionsContainer>
				</AppBarBase>
				{progress === true
					? <ProgressIndicator.Linear />
					: progress
					? <ProgressIndicator.Linear {...progress} />
					: undefined}
			</HeaderPortal>
			{configuration === 'large' && (
				<ExtraContent>
					{title === undefined || scrollContainer === null ? <TitleSkeleton /> : (
						<PageTitleLarge asChild>
							<AnimatedTitle
								container={scrollContainer}
								style={{ viewTransitionName: isContentScrolled ? undefined : 'app-bar-title' }}
							>
								{title}
							</AnimatedTitle>
						</PageTitleLarge>
					)}
				</ExtraContent>
			)}
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
		transition: 'background-color .3s',
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

const PageTitle = styled(animated(Typography.TitleLarge), {
	base: {
		gridColumn: 'title',
		color: theme.colors.onSurface,
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
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
		backgroundColor: theme.colors.surface,
	},
})

const PageTitleLarge = styled(animated(Typography.HeadlineMedium), {
	base: {
		color: theme.colors.onSurface,
		paddingInline: 16,
	},
})

const TitleSkeleton = styled(Skeleton, {
	base: {
		marginInline: 16,
		minHeight: 36,
		width: '50%',
	},
})
