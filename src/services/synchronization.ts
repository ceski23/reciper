/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/naming-convention */
import { PersistedState } from 'redux-persist';

import { Entries } from 'types';

import { migrate, RecipesState, RECIPES_STATE_VERSION } from 'store/recipes';

import { exhaustiveCheck } from 'utils/guards';
import { cyrb53 } from 'utils/hash';

type SyncStatus =
  'NEW_LOCAL' |
  'NEW_REMOTE' |
  'STATUS_MISSING' |
  'REMOTE_REMOVED' |
  'LOCAL_REMOVED' |
  'MISSING' |
  'SYNCHRONIZED';

// Based on: https://unterwaditzer.net/2016/sync-algorithm.html
export const synchronizeRecipes = async (
  remoteData: RecipesState & PersistedState,
  localData: RecipesState & PersistedState,
) => {
  const { _persist, status, list: localRecipes } = localData;

  const {
    list: remoteRecipes,
  } = await migrate(remoteData, RECIPES_STATE_VERSION) as unknown as RecipesState;

  const localIds = new Set(Object.keys(localRecipes));
  const remoteIds = new Set(Object.keys(remoteRecipes));
  const statusIds = new Set(Object.keys(status));

  const assignedIds: Record<SyncStatus, Set<string>> = {
    NEW_LOCAL: localIds.difference(remoteIds).difference(statusIds),
    NEW_REMOTE: remoteIds.difference(localIds).difference(statusIds),
    LOCAL_REMOVED: remoteIds.intersection(statusIds).difference(localIds),
    REMOTE_REMOVED: localIds.intersection(statusIds).difference(remoteIds),
    STATUS_MISSING: localIds.intersection(remoteIds).difference(statusIds),
    MISSING: statusIds.difference(localIds).difference(remoteIds),
    SYNCHRONIZED: localIds.intersection(remoteIds).intersection(statusIds),
  };

  const mergedRecipes = { ...localRecipes };
  const mergedStatus = { ...status };

  for (const [idStatus, ids] of Object.entries(assignedIds) as Entries<SyncStatus, Set<string>>) {
    for (const id of ids) {
      switch (idStatus) {
        case 'NEW_LOCAL': {
          const recipe = localRecipes[id];

          mergedStatus[id] = {
            localHash: cyrb53(JSON.stringify(recipe)),
            remoteHash: cyrb53(JSON.stringify(recipe)),
          };
          break;
        }

        case 'NEW_REMOTE': {
          const recipe = remoteRecipes[id];
          mergedRecipes[id] = recipe;

          mergedStatus[id] = {
            localHash: cyrb53(JSON.stringify(recipe)),
            remoteHash: cyrb53(JSON.stringify(recipe)),
          };

          break;
        }

        case 'LOCAL_REMOVED': {
          delete mergedStatus[id];

          break;
        }

        case 'REMOTE_REMOVED': {
          delete mergedRecipes[id];
          delete mergedStatus[id];

          break;
        }

        case 'MISSING': {
          delete mergedStatus[id];

          break;
        }

        case 'STATUS_MISSING': {
        // For now, just use local or remote version of recipe.
        // TODO: Implement proper conflicts resolution
          const recipe = localRecipes[id] ?? remoteRecipes[id];

          mergedStatus[id] = {
            localHash: cyrb53(JSON.stringify(recipe)),
            remoteHash: cyrb53(JSON.stringify(recipe)),
          };

          break;
        }

        case 'SYNCHRONIZED': {
          const localHash = cyrb53(JSON.stringify(localRecipes[id]));
          const remoteHash = cyrb53(JSON.stringify(remoteRecipes[id]));

          // Modified in local
          if (status[id].localHash !== localHash && status[id].remoteHash === remoteHash) {
            mergedStatus[id] = {
              localHash,
              remoteHash: localHash,
            };
          }
          // Modified in remote
          else if (status[id].remoteHash !== remoteHash && status[id].localHash === localHash) {
            mergedRecipes[id] = remoteRecipes[id];
            mergedStatus[id] = {
              localHash: remoteHash,
              remoteHash,
            };
          }
          // Modified both locally and remotely
          else if (status[id].localHash !== localHash && status[id].remoteHash !== remoteHash) {
          // For now, just use local version of recipe.
          // TODO: Implement proper conflicts resolution
            mergedStatus[id] = {
              localHash,
              remoteHash: localHash,
            };
          }

          break;
        }

        default:
          exhaustiveCheck(idStatus, 'Not all sync statuses checked');
          break;
      }
    }
  }

  const results = {
    _persist,
    status: mergedStatus,
    list: mergedRecipes,
  };

  return results;
};
