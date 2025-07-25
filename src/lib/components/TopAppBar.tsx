import { useIsContainerScrolled } from '@hooks/useIsContainerScrolled'
import { styled } from '@macaron-css/react'
import { animated } from '@react-spring/web'
import { uiStore } from '@stores/ui'
import { mq } from '@styles/utils'
import { interpolate, modeRgb, serializeRgb, useMode } from 'culori/fn'
import {
	type ComponentProps,
	Fragment,
	type FunctionComponent,
	type PropsWithChildren,
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { theme } from 'lib/styles'
import { isDefined } from 'lib/utils'
import { AnimatedTitle } from './AnimatedTitle'
import { HeaderPortal } from './HeaderPortal'
import { IconButton } from './IconButton'
import { ProgressIndicator } from './ProgressIndicator'
import { Skeleton } from './Skeleton'
import { Typography } from './Typography'

// eslint-disable-next-line react-hooks/rules-of-hooks
useMode(modeRgb)

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
	const lastColor = useRef(themeColor)

	useEffect(() => {
		setThemeColor(getColor())

		const styleObserver = new MutationObserver(() => setThemeColor(getColor()))
		styleObserver.observe(document.head, { childList: true })

		return () => styleObserver.disconnect()
	}, [getColor])

	useEffect(() => {
		if (themeColor === '') return

		const interpolator = interpolate([lastColor.current || themeColor, themeColor])

		setColorsSeries(
			Array
				.from({ length: 30 }, (_, i) => interpolator(i / 30))
				.map(serializeRgb)
				.filter(isDefined),
			10,
			color => document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color),
		)

		lastColor.current = themeColor
	}, [themeColor])

	return themeColor
}

const setColorsSeries = (colors: Array<string>, delay: number, callback: (color: string) => void) => {
	const timerId = setInterval(() => {
		const color = colors.shift()

		if (color === undefined) {
			clearInterval(timerId)
			return
		}

		callback(color)
	}, delay)
}

export const TopAppBarOptions: FunctionComponent<PropsWithChildren> = ({ children }) => {
	const { topAppBarOptions } = uiStore.useStore()

	return topAppBarOptions ? createPortal(children, topAppBarOptions) : null
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
	const scrollContainer = container ?? mainContent

	useAppBarColor(isContentScrolled, elevation)

	const topAppBarOptionsCallbackRef = useCallback((node: HTMLElement | null) => {
		uiStore.actions.setTopAppBarOptions(node)

		return () => uiStore.actions.setTopAppBarOptions(null)
	}, [])

	return (
		<Fragment>
			{renderProbe}
			<HeaderPortal>
				<meta name="theme-color" />
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
					<OptionsContainer ref={topAppBarOptionsCallbackRef}>
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
				<ExtraContent elevation={elevation ?? 'flat'}>
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
		transition: 'background-color .3s linear',
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
})

const PageTitleLarge = styled(animated(Typography.HeadlineMedium), {
	base: {
		color: theme.colors.onSurface,
		paddingInline: 16,
		'@media': {
			[mq.atLeast('md')]: {
				paddingInline: 0,
			},
		},
	},
})

const TitleSkeleton = styled(Skeleton, {
	base: {
		marginInline: 16,
		minHeight: 36,
		width: '50%',
		'@media': {
			[mq.atLeast('md')]: {
				marginInline: 0,
			},
		},
	},
})
