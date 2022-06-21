import { PersistPartial } from 'redux-persist/es/persistReducer';

import { RecipesState } from 'store/recipes';

export interface UserInfo {
  firstName: string;
  lastName: string;
  image: string;
}

export interface TaskListInfo {
  id: string;
  name: string;
}

export abstract class AccountProvider {
  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  accessToken: string;

  static providerName: string;

  static icon: string;

  static startLogin: () => void;

  static refreshAccessToken: (refreshToken: string) => Promise<string>;

  abstract getUserInfo(): Promise<UserInfo>;

  abstract getTaskLists(): Promise<TaskListInfo[]>;

  abstract logout(): Promise<void>;

  abstract addIngredientsToList(
    listId: string,
    ingredients: string[],
    recipeTitle: string
  ): Promise<void>;

  abstract backupRecipes(recipes: RecipesState & PersistPartial): Promise<void>;

  abstract restoreRecipes(): Promise<(RecipesState & PersistPartial) | undefined>;
}
