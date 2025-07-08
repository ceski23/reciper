import { Button } from '@components/Button'
import { Icon } from '@components/Icon'
import { typography } from '@components/Typography'
import { styled } from '@macaron-css/react'
import { theme } from '@styles/theme'
import { forwardRef, type ReactElement } from 'react'
import { type SvgSpriteIconName } from 'virtual:svg-sprite'

type BannerProps = {
	content: ReactElement | string
	icon?: SvgSpriteIconName
	actions: Array<{
		label: string
		onClick: () => void
	}>
}

export const Banner = forwardRef<HTMLDivElement, BannerProps>(({ actions, content, icon }, ref) => (
	<Container ref={ref}>
		<Content className={typography.bodyMedium}>
			{icon && (
				<IconBackdrop>
					<Icon name={icon} />
				</IconBackdrop>
			)}
			{content}
		</Content>
		<Actions>
			{actions.map((action, index) => {
				return (
					<Button
						key={index}
						onClick={action.onClick}
						variant="text"
					>
						{action.label}
					</Button>
				)
			})}
		</Actions>
	</Container>
))

const Container = styled('header', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		padding: 16,
		backgroundColor: theme.colors.surfaceContainer,
		color: theme.colors.onPrimaryContainer,
		gap: 8,
		borderBottom: '1px solid',
		borderTop: '1px solid',
		borderColor: theme.colors.surfaceContainerHigh,
	},
})

const Content = styled('div', {
	base: {
		display: 'flex',
		gap: 24,
		alignItems: 'center',
	},
})

const Actions = styled('div', {
	base: {
		display: 'flex',
		gap: 8,
		justifyContent: 'flex-end',
	},
})

const IconBackdrop = styled('div', {
	base: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 60,
		height: 60,
		borderRadius: '50%',
		backgroundColor: theme.colors.primary,
		color: theme.colors.onPrimary,
		padding: 12,
	},
})
