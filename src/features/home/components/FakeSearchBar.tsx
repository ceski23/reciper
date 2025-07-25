import { styled } from '@macaron-css/react'
import { Link, useNavigate } from '@tanstack/react-router'
import type { CSSProperties, FunctionComponent } from 'react'
import type { SvgSpriteIconName } from 'virtual:svg-sprite'
import { useUserInfo } from 'features/auth/hooks'
import { Icon } from 'lib/components/Icon'
import { Typography } from 'lib/components/Typography'
import { useRipples } from 'lib/hooks/useRipples'
import { styleUtils, theme } from 'lib/styles'

type FakeSearchBarProps = {
	leadingIcon: SvgSpriteIconName
	placeholder?: string
	style?: CSSProperties
}

export const FakeSearchBar: FunctionComponent<FakeSearchBarProps> = ({ leadingIcon, placeholder, style }) => {
	const { eventHandlers, renderRipples } = useRipples()
	const navigate = useNavigate()
	const userInfo = useUserInfo()

	return (
		<SearchBarBase
			{...eventHandlers}
			onClick={() => navigate({ to: '/search' })}
			style={style}
		>
			{renderRipples}
			<LeadingIcon name={leadingIcon} />
			{placeholder && <PlaceholderText>{placeholder}</PlaceholderText>}
			{userInfo && (
				<AccountLink
					to="/settings/account"
					onClick={event => event.stopPropagation()}
				>
					<Avatar
						alt={userInfo.name}
						src={userInfo.avatar}
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
		viewTransitionName: 'searchbar',
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
