import { keyframes } from '@macaron-css/core'
import { Fragment, type FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RecipeListItem } from 'features/recipes/RecipeListItem'
import { FloatingActionButton } from 'lib/components/FloatingActionButton'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { IconButton } from 'lib/components/IconButton'
import { navigationMenuHeight } from 'lib/components/Layout'
import { VirtualList } from 'lib/components/list/VirtualList'
import { Menu } from 'lib/components/Menu'
import { TopAppBar } from 'lib/components/TopAppBar'
import { useIsContainerScrolled } from 'lib/hooks/useIsContainerScrolled'

export const Recipes: FunctionComponent = () => {
	const { t } = useTranslation()
	const [isMoreOpen, setIsMoreOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isListScrolled, setIsListScrolled] = useState(false)
	const renderProbe = useIsContainerScrolled(setIsListScrolled)

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
					elevation={isListScrolled ? 'onScroll' : 'flat'}
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
			<VirtualList virtualProps={{ overscan: 10 }}>
				{renderProbe}
				{Array.from({ length: 1000 }, (_, index) => <RecipeListItem key={index} />)}
			</VirtualList>
			<FloatingActionButton
				icon="plus"
				label="Add recipe"
				type="button"
				variant="primary"
				size={isListScrolled ? undefined : 'expanded'}
				style={{
					position: 'fixed',
					bottom: `calc(${navigationMenuHeight} + 16px)`,
					right: 16,
				}}
			/>
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
