import { styled } from '@macaron-css/react'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { IconButton } from 'lib/components/IconButton'
import { bodyLarge } from 'lib/components/Typography'
import { PATHS } from 'lib/routing/paths'
import { theme } from 'lib/styles'

type TopSearchBarProps = {
	query: string
	placeholder?: string
	onQueryChange: (newQuery: string) => void
}

export const TopSearchBar = forwardRef<HTMLInputElement, TopSearchBarProps>(({ onQueryChange, query, placeholder }, ref) => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const location = useLocation()

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
				title={t('navigation.goBack')}
				onClick={handleGoBack}
			/>
			<TextField
				inputMode="search"
				className={bodyLarge}
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
