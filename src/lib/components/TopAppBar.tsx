import { styled } from '@macaron-css/react'
import { animated, useScroll } from '@react-spring/web'
import { type ComponentProps, type CSSProperties, Fragment, type FunctionComponent, type ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { Skeleton } from 'lib/components/Skeleton'
import { useIsContainerScrolled } from 'lib/hooks/useIsContainerScrolled'
import { useMeasureHeight } from 'lib/hooks/useMeasureHeight'
import { PATHS } from 'lib/routing/paths'
import { theme } from 'lib/styles'
import { IconButton } from './IconButton'
import { MetaThemeColor } from './MetaThemeColor'
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
	style?: CSSProperties
	container: HTMLElement | null
	elevation?: ComponentProps<typeof AppBarBase>['elevation']
}

export const TopAppBar: FunctionComponent<TopAppBarProps> = ({
	title,
	configuration,
	options,
	progress,
	style,
	container,
	elevation,
}) => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const location = useLocation()
	const [isContentScrolled, setIsContentScrolled] = useState(false)
	const renderProbe = useIsContainerScrolled(setIsContentScrolled)
	const { scrollY } = useScroll({
		container: { current: container! },
		default: {
			immediate: true,
		},
	})
	const [extraContentHeight, setExtraContentHeight] = useState<number>(0)
	const extraContentRef = useMeasureHeight<HTMLDivElement>(height => setExtraContentHeight(height ?? 0))

	const handleGoBack = () => {
		if (location.key === 'default') {
			return navigate(PATHS.HOME.buildPath({}))
		}

		navigate(-1)
	}

	return (
		<Fragment>
			{renderProbe}
			<HeaderPortal>
				<MetaThemeColor isScrolled={isContentScrolled} />
				<AppBarBase
					elevation={elevation ?? (isContentScrolled ? 'onScroll' : 'flat')}
					style={style}
				>
					<IconButton
						icon="backArrow"
						title={t('navigation.goBack')}
						onClick={handleGoBack}
					/>
					<PageTitle asChild>
						<animated.h1
							style={{
								opacity: configuration === 'large' && extraContentHeight > 0
									? scrollY.to(sy => 1 - (Math.max(0, -sy + extraContentHeight) / extraContentHeight))
									: undefined,
								viewTransitionName: isContentScrolled || configuration !== 'large' ? 'app-bar-title' : undefined,
							}}
						>
							{title}
						</animated.h1>
					</PageTitle>
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
				<ExtraContent
					style={style}
					ref={extraContentRef}
				>
					{title === undefined ? <TitleSkeleton /> : (
						<PageTitleLarge asChild>
							<animated.h1
								style={{
									opacity: configuration === 'large' && extraContentHeight > 0
										? scrollY.to(sy => (Math.max(0, -sy + extraContentHeight) / extraContentHeight))
										: undefined,
									viewTransitionName: isContentScrolled ? undefined : 'app-bar-title',
								}}
							>
								{title}
							</animated.h1>
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

const PageTitleLarge = styled(Typography.HeadlineMedium, {
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
