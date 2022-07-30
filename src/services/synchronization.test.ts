import { PersistedState } from 'redux-persist';

import { Recipe } from 'services/recipes';
import { kurczak, pancakes, ramen } from 'services/recipes/samples';
import { synchronizeRecipes } from 'services/synchronization';

import { RecipesState, RECIPES_STATE_VERSION } from 'store/recipes';

import { cyrb53 } from 'utils/hash';

interface Seedrandom {
  default: typeof import('seedrandom');
}

vi.mock('nanoid', async () => {
  const seedrandom = await vi.importActual<Seedrandom>('seedrandom');
  const { urlAlphabet, customRandom } = await vi.importActual<typeof import('nanoid')>('nanoid');

  const rng = seedrandom.default('test');
  const idGenerator = customRandom(
    urlAlphabet,
    10,
    (size) => new Uint8Array(size).map(() => 256 * rng()),
  );

  return {
    nanoid: idGenerator,
  };
});

const createState = (recipes: Array<Recipe>, status: RecipesState['status']): RecipesState & PersistedState => ({
  _persist: {
    rehydrated: true,
    version: RECIPES_STATE_VERSION,
  },
  list: Object.fromEntries(recipes.map((recipe) => [recipe.id, recipe])),
  status,
});

describe('synchronizeRecipes', () => {
  const hashes = Object.fromEntries([kurczak, pancakes, ramen].map((recipe) => [
    recipe.id,
    cyrb53(JSON.stringify(recipe)),
  ]));

  it('should synchronize locally added recipe', async () => {
    const local = createState([kurczak, pancakes], {
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
    });

    const remote = createState([kurczak], {
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
    });

    const syncedData = await synchronizeRecipes(remote, local);

    expect(syncedData.status).toStrictEqual({
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
      [pancakes.id]: { localHash: hashes[pancakes.id], remoteHash: hashes[pancakes.id] },
    });

    expect(syncedData.list).toStrictEqual({
      [kurczak.id]: kurczak,
      [pancakes.id]: pancakes,
    });
  });

  it('should synchronize remotely added recipe', async () => {
    const local = createState([kurczak], {
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
    });

    const remote = createState([kurczak, ramen], {
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
    });

    const syncedData = await synchronizeRecipes(remote, local);

    expect(syncedData.status).toStrictEqual({
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
      [ramen.id]: { localHash: hashes[ramen.id], remoteHash: hashes[ramen.id] },
    });

    expect(syncedData.list).toStrictEqual({
      [kurczak.id]: kurczak,
      [ramen.id]: ramen,
    });
  });

  it('should synchronize both locally and remotely added recipes', async () => {
    const local = createState([kurczak, pancakes], {
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
    });

    const remote = createState([kurczak, ramen], {
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
    });

    const syncedData = await synchronizeRecipes(remote, local);

    expect(syncedData.status).toStrictEqual({
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
      [pancakes.id]: { localHash: hashes[pancakes.id], remoteHash: hashes[pancakes.id] },
      [ramen.id]: { localHash: hashes[ramen.id], remoteHash: hashes[ramen.id] },
    });

    expect(syncedData.list).toStrictEqual({
      [kurczak.id]: kurczak,
      [pancakes.id]: pancakes,
      [ramen.id]: ramen,
    });
  });

  it('should update locally modified recipe', async () => {
    const local = createState([kurczak, pancakes], {
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
      [pancakes.id]: { localHash: 'old_hash', remoteHash: hashes[pancakes.id] },
    });

    const remote = createState([kurczak, pancakes], {
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
      [pancakes.id]: { localHash: hashes[pancakes.id], remoteHash: hashes[pancakes.id] },
    });

    const syncedData = await synchronizeRecipes(remote, local);

    expect(syncedData.status).toStrictEqual({
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
      [pancakes.id]: { localHash: hashes[pancakes.id], remoteHash: hashes[pancakes.id] },
    });

    expect(syncedData.list).toStrictEqual({
      [kurczak.id]: kurczak,
      [pancakes.id]: pancakes,
    });
  });

  it('should update remotely modified recipe', async () => {
    const local = createState([kurczak, pancakes], {
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
      [pancakes.id]: { localHash: hashes[pancakes.id], remoteHash: 'old_hash' },
    });

    const remote = createState([kurczak, pancakes], {
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
      [pancakes.id]: { localHash: hashes[pancakes.id], remoteHash: hashes[pancakes.id] },
    });

    const syncedData = await synchronizeRecipes(remote, local);

    expect(syncedData.status).toStrictEqual({
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
      [pancakes.id]: { localHash: hashes[pancakes.id], remoteHash: hashes[pancakes.id] },
    });

    expect(syncedData.list).toStrictEqual({
      [kurczak.id]: kurczak,
      [pancakes.id]: pancakes,
    });
  });

  it('should update both locally and remotely modified recipes', async () => {
    const local = createState([kurczak, pancakes], {
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
      [pancakes.id]: { localHash: 'old_hash', remoteHash: 'old_hash' },
    });

    const remote = createState([kurczak, pancakes], {
      [kurczak.id]: { localHash: 'old_hash2', remoteHash: 'old_hash2' },
      [pancakes.id]: { localHash: hashes[pancakes.id], remoteHash: hashes[pancakes.id] },
    });

    const syncedData = await synchronizeRecipes(remote, local);

    expect(syncedData.status).toStrictEqual({
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
      [pancakes.id]: { localHash: hashes[pancakes.id], remoteHash: hashes[pancakes.id] },
    });

    expect(syncedData.list).toStrictEqual({
      [kurczak.id]: kurczak,
      [pancakes.id]: pancakes,
    });
  });

  it('should remove locally removed recipe', async () => {
    const local = createState([kurczak], {
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
      [pancakes.id]: { localHash: hashes[pancakes.id], remoteHash: hashes[pancakes.id] },
    });

    const remote = createState([kurczak, pancakes], {
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
      [pancakes.id]: { localHash: hashes[pancakes.id], remoteHash: hashes[pancakes.id] },
    });

    const syncedData = await synchronizeRecipes(remote, local);

    expect(syncedData.status).toStrictEqual({
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
    });

    expect(syncedData.list).toStrictEqual({
      [kurczak.id]: kurczak,
    });
  });

  it('should remove remotely removed recipe', async () => {
    const local = createState([kurczak, pancakes], {
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
      [pancakes.id]: { localHash: hashes[pancakes.id], remoteHash: hashes[pancakes.id] },
    });

    const remote = createState([kurczak], {
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
      [pancakes.id]: { localHash: hashes[pancakes.id], remoteHash: hashes[pancakes.id] },
    });

    const syncedData = await synchronizeRecipes(remote, local);

    expect(syncedData.status).toStrictEqual({
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
    });

    expect(syncedData.list).toStrictEqual({
      [kurczak.id]: kurczak,
    });
  });

  it('should remove both locally and remotely removed recipes', async () => {
    const local = createState([pancakes], {
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
      [pancakes.id]: { localHash: hashes[pancakes.id], remoteHash: hashes[pancakes.id] },
    });

    const remote = createState([kurczak], {
      [kurczak.id]: { localHash: hashes[kurczak.id], remoteHash: hashes[kurczak.id] },
      [pancakes.id]: { localHash: hashes[pancakes.id], remoteHash: hashes[pancakes.id] },
    });

    const syncedData = await synchronizeRecipes(remote, local);

    expect(syncedData.status).toStrictEqual({});
    expect(syncedData.list).toStrictEqual({});
  });
});
