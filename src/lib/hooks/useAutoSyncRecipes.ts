import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAccountProvider } from 'features/auth/hooks'
import { recipesQuery, useSyncRecipes } from 'features/recipes/recipes'
import { accountStore } from 'lib/stores/account'
import { settingsStore } from 'lib/stores/settings'

export const useAutoSyncRecipes = () => {
	const accountProvider = useAccountProvider()
	const recipes = useQuery(recipesQuery())
	const syncRecipes = useSyncRecipes()
	const { syncStatus, setSyncStatus } = accountStore.useStore()
	const { account: { sync } } = settingsStore.useStore()

	useEffect(() => {
		if (accountProvider === undefined || recipes.data === undefined || !sync) {
			return
		}

		syncRecipes.mutate({
			accountProvider,
			recipes: recipes.data,
			syncStatus,
		}, {
			onSuccess: ({ syncStatus }) => setSyncStatus(syncStatus),
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [recipes.data, sync])
}
