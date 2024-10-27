import { useIsContainerScrolled } from '@hooks/useIsContainerScrolled'
import { styled } from '@macaron-css/react'
import { animated } from '@react-spring/web'
import { uiStore } from '@stores/ui'
import { type ComponentProps, Fragment, type FunctionComponent, type ReactNode, useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { theme } from 'lib/styles'
import { AnimatedTitle } from './AnimatedTitle'
import { HeaderPortal } from './HeaderPortal'
import { IconButton } from './IconButton'
import { ProgressIndicator } from './ProgressIndicator'
import { Skeleton } from './Skeleton'
import { Typography } from './Typography'

type TopAppBarProps = {
	configuration: 'small' | 'medium' | 'large'
	title?: string
	options?: ReactNode
	progress?: {
		value?: number | undefined
		max?: number
	} | boolean
	container?: HTMLElement | null
	elevation?: ComponentProps<typeof AppBarBase>['elevation']
	onBackClick: () => void
	leadingButton?: ReactNode
}

const getVarName = (variable: string) => variable.match(/var\((.*)\)/)?.[1] ?? ''

const useAppBarColor = (isContentScrolled: boolean, elevation: ComponentProps<typeof AppBarBase>['elevation']) => {
	const getColor = useCallback(
		() =>
			window.getComputedStyle(document.body).getPropertyValue(
				getVarName(isContentScrolled || elevation === 'onScroll' ? theme.colors.surfaceContainer : theme.colors.surface),
			),
		[isContentScrolled, elevation],
	)
	const [themeColor, setThemeColor] = useState(() => getColor())

	useEffect(() => {
		setThemeColor(getColor())

		const styleObserver = new MutationObserver(() => setThemeColor(getColor()))
		styleObserver.observe(document.head, { childList: true })

		return () => styleObserver.disconnect()
	}, [getColor])

	return themeColor
}

export const TopAppBar: FunctionComponent<TopAppBarProps> = ({
	title,
	configuration,
	options,
	progress,
	elevation,
	container,
	onBackClick,
	leadingButton,
}) => {
	const { t } = useTranslation()
	const [isContentScrolled, setIsContentScrolled] = useState(false)
	const renderProbe = useIsContainerScrolled(setIsContentScrolled)
	const { mainContent } = uiStore.useStore()
	const themeColor = useAppBarColor(isContentScrolled, elevation)
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
					{leadingButton ?? (
						<IconButton
							icon="backArrow"
							title={t('navigation.goBack')}
							onClick={onBackClick}
						/>
					)}
					{scrollContainer && (
						<PageTitle
							render={(
								<AnimatedTitle
									container={scrollContainer}
									shouldAnimate={configuration === 'large'}
									style={{ viewTransitionName: isContentScrolled || configuration !== 'large' ? 'app-bar-title' : undefined }}
									reverse
								>
									{title}
								</AnimatedTitle>
							)}
						/>
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
						<PageTitleLarge
							render={(
								<AnimatedTitle
									container={scrollContainer}
									style={{ viewTransitionName: isContentScrolled ? undefined : 'app-bar-title' }}
								>
									{title}
								</AnimatedTitle>
							)}
						/>
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
