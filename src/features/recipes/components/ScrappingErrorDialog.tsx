import * as Ariakit from '@ariakit/react'
import { Button } from '@components/Button'
import { SimpleDialog } from '@components/dialog/Dialog'
import { withDialogAnimation } from '@components/dialog/withDialogAnimation'
import { styled } from '@macaron-css/react'
import { theme } from '@styles/theme'
import { isValidUrl } from '@utils/urls'
import { type FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import * as v from 'valibot'
import { type recipeScheme } from 'features/recipes/types'

type ScrappingErrorDialogProps = {
	open?: boolean
	onClose: () => void
	url?: string
	error?: v.ValiError<typeof recipeScheme>
}

export const ScrappingErrorDialog: FunctionComponent<ScrappingErrorDialogProps> = withDialogAnimation(({
	onClose,
	open,
	url,
	error,
	...props
}) => {
	const { t } = useTranslation()
	const disclosure = Ariakit.useDisclosureStore()
	const isOpen = Ariakit.useStoreState(disclosure, state => state.open)
	const errorText = error
		? Object.entries(v.flatten(error.issues).nested ?? {}).map(([name, errors]) => `${name}: ${errors?.join(', ')}`).join('\n')
		: undefined

	return (
		<SimpleDialog
			{...props}
			open={open}
			onClose={onClose}
			title={t('scraping.title')}
			description={t('scraping.error', { website: isValidUrl(url) ? new URL(url).host : undefined })}
			extraContent={error !== undefined
				? (
					<DisclosureContainer>
						<Disclosure
							alwaysVisible
							store={disclosure}
						>
							<DisclosureInner>
								<ErrorsBox>
									{errorText}
								</ErrorsBox>
							</DisclosureInner>
						</Disclosure>
					</DisclosureContainer>
				)
				: undefined}
			actions={[
				...(error !== undefined
					? [
						(
							<Ariakit.Disclosure
								key="toggle"
								store={disclosure}
								render={<Button variant="text" />}
							>
								{isOpen ? t('scraping.hideIssues') : t('scraping.showIssues')}
							</Ariakit.Disclosure>
						),
					]
					: []),
				{
					label: t('scraping.close'),
					onClick: onClose,
				},
			]}
		/>
	)
})

const DisclosureContainer = styled('div', {
	base: {
		paddingInline: 24,
	},
})

const Disclosure = styled(Ariakit.DisclosureContent, {
	base: {
		display: 'grid',
		gridTemplateRows: '0fr',
		transition: 'grid-template-rows 0.3s ease-in-out',
		selectors: {
			'&[data-open="true"]': {
				gridTemplateRows: '1fr',
			},
		},
	},
})

const DisclosureInner = styled('div', {
	base: {
		overflow: 'hidden',
	},
})

const ErrorsBox = styled('pre', {
	base: {
		color: theme.colors.onSurface,
		backgroundColor: theme.colors.surfaceContainerLowest,
		paddingBlock: 8,
		paddingInline: 12,
		borderRadius: 8,
		overflow: 'auto',
	},
})
