import { type Recipe } from 'features/recipes/types'
import { cyrb53 } from 'lib/utils/hash'

export type SyncStatus = {
	localHash: string
	remoteHash: string
}

type SynchronizeParams = {
	localRecipes: Record<string, Recipe>
	remoteRecipes: Record<string, Recipe>
	syncStatus: Record<string, SyncStatus>
}

const calcRecipeHash = (recipe: Recipe) => cyrb53(JSON.stringify(recipe))

export const synchronizeRecipes = ({ localRecipes, remoteRecipes, syncStatus }: SynchronizeParams) => {
	const localIds = new Set(Object.keys(localRecipes))
	const remoteIds = new Set(Object.keys(remoteRecipes))
	const syncStatusIds = new Set(Object.keys(syncStatus))

	const newLocalRecipesIds = localIds.difference(remoteIds).difference(syncStatusIds)
	const newRemoteRecipesIds = remoteIds.difference(localIds).difference(syncStatusIds)
	const removedLocalRecipesIds = remoteIds.intersection(syncStatusIds).difference(localIds)
	const removedRemoteRecipesIds = localIds.intersection(syncStatusIds).difference(remoteIds)
	const statusMissingRecipesIds = localIds.intersection(remoteIds).difference(syncStatusIds)
	const nonExistingRecipesIds = syncStatusIds.difference(localIds).difference(remoteIds)
	const synchronizedRecipesIds = localIds.intersection(remoteIds).intersection(syncStatusIds)

	const syncedRecipes = new Map<string, Recipe>(Object.entries(localRecipes))
	const syncedStatus = new Map<string, SyncStatus>(Object.entries(syncStatus))

	// If the ID exists on side A, but not on B or the status, it must have been created on A. Copy the item from A to B and also insert it into status.
	newLocalRecipesIds.forEach(id => {
		const hash = calcRecipeHash(localRecipes[id])

		syncedStatus.set(id, { localHash: hash, remoteHash: hash })
	})

	// if the ID exists only in B, it must have been created there.
	newRemoteRecipesIds.forEach(id => {
		const hash = calcRecipeHash(remoteRecipes[id])

		syncedRecipes.set(id, remoteRecipes[id])
		syncedStatus.set(id, { localHash: hash, remoteHash: hash })
	})

	// If the ID exists on side A and the status, but not on B, it has been deleted on B. Delete it from A and the status.
	removedRemoteRecipesIds.forEach(id => {
		syncedRecipes.delete(id)
		syncedStatus.delete(id)
	})

	// If the ID exists on side B and the status, but not on A, it has been deleted on A.
	removedLocalRecipesIds.forEach(id => {
		syncedStatus.delete(id)
	})

	// If it exists on side A and side B, but not in status, add the ID to the status.
	// TODO: Implement proper conflicts resolution
	statusMissingRecipesIds.forEach(id => {
		const hash = calcRecipeHash(localRecipes[id] ?? remoteRecipes[id])

		syncedStatus.set(id, { localHash: hash, remoteHash: hash })
	})

	// If it exists in the status, but not on side A or side B, it has been deleted on both sides. Remove it from the status.
	nonExistingRecipesIds.forEach(id => {
		syncedStatus.delete(id)
	})

	// If it exists on both sides and in the status, it has been modified on one or both sides.
	synchronizedRecipesIds.forEach(id => {
		const localHash = calcRecipeHash(localRecipes[id])
		const remoteHash = calcRecipeHash(remoteRecipes[id])

		if (localHash !== syncStatus[id].localHash && remoteHash !== syncStatus[id].remoteHash) {
			// Modified on both sides
			// TODO: Implement proper conflicts resolution
			syncedRecipes.set(id, localRecipes[id])
			syncedStatus.set(id, { localHash, remoteHash: localHash })
		} else if (localHash !== syncStatus[id].localHash) {
			// Modified on the local side
			syncedStatus.set(id, { localHash, remoteHash: localHash })
		} else if (remoteHash !== syncStatus[id].remoteHash) {
			// Modified on the remote side
			syncedRecipes.set(id, remoteRecipes[id])
			syncedStatus.set(id, { localHash: remoteHash, remoteHash })
		}
	})

	return {
		recipes: Object.fromEntries(syncedRecipes),
		syncStatus: Object.fromEntries(syncedStatus),
	}
}
