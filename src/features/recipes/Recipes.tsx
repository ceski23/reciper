import { keyframes } from '@macaron-css/core'
import { useAtomValue } from 'jotai'
import { Fragment, type FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FloatingActionButton } from 'lib/components/FloatingActionButton'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { IconButton } from 'lib/components/IconButton'
import { isMainScrolledAtom } from 'lib/components/Layout'
import { Menu } from 'lib/components/Menu'
import { TopAppBar } from 'lib/components/TopAppBar'
import { Typography } from 'lib/components/Typography'

export const Recipes: FunctionComponent = () => {
	const { t } = useTranslation()
	const [isMoreOpen, setIsMoreOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const isMainScrolled = useAtomValue(isMainScrolledAtom)

	useEffect(() => {
		if (isLoading) {
			const id = setTimeout(() => setIsLoading(false), 3000)

			return () => clearTimeout(id)
		}
	}, [isLoading])

	return (
		<Fragment>
			<HeaderPortal>
				<TopAppBar
					configuration="small"
					title={t('paths.recipes')}
					progress={isLoading}
					options={(
						<Fragment>
							<IconButton
								icon="sync"
								title="Sync recipes"
								onClick={() => setIsLoading(true)}
								isSelected={isLoading}
								style={{
									animation: isLoading ? `${spinAnimation} 1s infinite` : undefined,
								}}
							/>
							<Menu.Root
								open={isMoreOpen}
								onOpenChange={setIsMoreOpen}
							>
								<Menu.Trigger asChild>
									<IconButton
										icon="more"
										title="More"
										isSelected={isMoreOpen}
									/>
								</Menu.Trigger>
								<Menu.Content open={isMoreOpen}>
									<Menu.Item text="Test 1" />
									<Menu.Item text="Test 2" />
									<Menu.Item text="Test 3" />
									<Menu.Item text="Test 4" />
									<Menu.Item text="Test 5" />
								</Menu.Content>
							</Menu.Root>
						</Fragment>
					)}
				/>
			</HeaderPortal>
			<FloatingActionButton
				icon="plus"
				label="Add recipe"
				type="button"
				variant="primary"
				size={isMainScrolled ? undefined : 'expanded'}
				style={{
					position: 'absolute',
					bottom: 16,
					right: 16,
				}}
			/>
			<Typography.BodyMedium style={{ marginTop: '110vh' }}>Test</Typography.BodyMedium>
		</Fragment>
	)
}

const spinAnimation = keyframes({
	from: {
		rotate: '0deg',
	},
	to: {
		rotate: '-360deg',
	},
})
