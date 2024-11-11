import { styled } from '@macaron-css/react'
import { getVariableColorValue } from '@utils/dom'
import { forwardRef, useLayoutEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { theme } from 'lib/styles'
import { IconButton } from './IconButton'
import { typography } from './Typography'

type TopSearchBarProps = {
	query: string
	placeholder?: string
	onQueryChange: (newQuery: string) => void
	onBackClick: () => void
}

export const TopSearchBar = forwardRef<HTMLInputElement, TopSearchBarProps>(({ onQueryChange, query, placeholder, onBackClick }, ref) => {
	const { t } = useTranslation()
	const [themeColor, setThemeColor] = useState<string>()

	useLayoutEffect(() => {
		const styleObserver = new MutationObserver(() => setThemeColor(getVariableColorValue(theme.colors.surfaceContainerHigh)))
		styleObserver.observe(document.head, { childList: true })

		return () => styleObserver.disconnect()
	}, [])

	return (
		<AppBarBase>
			<Helmet>
				<meta
					name="theme-color"
					content={themeColor}
				/>
			</Helmet>
			<IconButton
				icon="backArrow"
				title={t('navigation.goBack')}
				onClick={onBackClick}
			/>
			<TextField
				inputMode="search"
				className={typography.bodyLarge}
				ref={ref}
				value={query}
				onChange={event => onQueryChange(event.currentTarget.value)}
				placeholder={placeholder}
			/>
			{query.length > 0 && (
				<IconButton
					icon="close"
					title={t('search.clear')}
					onClick={() => onQueryChange('')}
				/>
			)}
		</AppBarBase>
	)
})

const AppBarBase = styled('div', {
	base: {
		paddingBlock: 8,
		paddingInline: 4,
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		gap: 4,
		transition: 'background-color .2s',
		background: theme.colors.surfaceContainerHigh,
		borderBottom: `1px solid ${theme.colors.outline}`,
		viewTransitionName: 'searchbar',
	},
})

const TextField = styled('input', {
	base: {
		color: theme.colors.onSurface,
		padding: 0,
		margin: 0,
		border: 'none',
		height: '100%',
		flex: 1,
		background: 'transparent',
		outline: 'none',
		'::placeholder': {
			color: theme.colors.onSurfaceVariant,
		},
	},
})
