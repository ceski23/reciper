import { styled } from '@macaron-css/react'
import { useAtomValue } from 'jotai'
import { type CSSProperties, type FunctionComponent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { type SvgSpriteIconName } from 'virtual:svg-sprite'
import { Icon } from 'lib/components/Icon'
import { Typography } from 'lib/components/Typography'
import { useRipples } from 'lib/hooks/useRipples'
import { PATHS } from 'lib/routing/paths'
import { accountDataAtom } from 'lib/stores/account'
import { styleUtils, theme } from 'lib/styles'

type FakeSearchBarProps = {
	leadingIcon: SvgSpriteIconName
	placeholder?: string
	style?: CSSProperties
}

export const FakeSearchBar: FunctionComponent<FakeSearchBarProps> = ({ leadingIcon, placeholder, style }) => {
	const { eventHandlers, renderRipples } = useRipples()
	const navigate = useNavigate()
	const userAccountData = useAtomValue(accountDataAtom)

	return (
		<SearchBarBase
			{...eventHandlers}
			onClick={() => navigate(PATHS.RECIPES.SEARCH.path)}
			style={style}
		>
			{renderRipples}
			<LeadingIcon name={leadingIcon} />
			{placeholder && <PlaceholderText>{placeholder}</PlaceholderText>}
			{userAccountData.user && (
				<AccountLink
					to={PATHS.SETTINGS.ACCOUNT.buildPath({})}
					onClick={event => event.stopPropagation()}
				>
					<Avatar
						alt={userAccountData.user.name}
						src={userAccountData.user.avatar}
					/>
				</AccountLink>
			)}
		</SearchBarBase>
	)
}

const SearchBarBase = styled('button', {
	base: {
		display: 'flex',
		height: 56,
		gap: 4,
		borderRadius: 28,
		backgroundColor: theme.colors.surfaceContainerHigh,
		padding: 4,
		alignItems: 'center',
		transition: 'background-color .2s',
		position: 'relative',
		overflow: 'hidden',
		width: '100%',
		border: 'none',
		textAlign: 'start',
		outline: 'none',
		':hover': {
			backgroundColor: styleUtils.blendWithColor(theme.colors.surfaceContainerHigh, theme.colors.onSurface, 0.08),
		},
		':focus-visible': {
			backgroundColor: styleUtils.blendWithColor(theme.colors.surfaceContainerHigh, theme.colors.onSurface, 0.08),
		},
	},
})

const PlaceholderText = styled(Typography.BodyLarge, {
	base: {
		color: theme.colors.onSurfaceVariant,
		flex: 1,
	},
})

const LeadingIcon = styled(Icon, {
	base: {
		width: 24,
		height: 24,
		color: theme.colors.onSurfaceVariant,
		margin: 12,
	},
})

const AccountLink = styled(Link, {
	base: {
		padding: 9,
		width: 48,
		height: 48,
	},
})

const Avatar = styled('img', {
	base: {
		width: 30,
		height: 30,
		borderRadius: '50%',
	},
})
