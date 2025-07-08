import { accountStore } from '@stores/account'
import { settingsStore } from '@stores/settings'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { recipesQuery, useSyncRecipes } from 'features/recipes/recipes'

export const useAutoSyncRecipes = () => {
	const recipes = useQuery(recipesQuery())
	const syncRecipes = useSyncRecipes()
	const { syncStatus, setSyncStatus, accountProvider } = accountStore.useStore()
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
