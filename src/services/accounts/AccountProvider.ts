import { PersistPartial } from 'redux-persist/es/persistReducer';

import { RecipesState } from 'store/recipes';

export interface UserInfo {
  firstName: string;
  lastName: string;
  image: string;
}

export abstract class AccountProvider {
  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  accessToken: string;

  static providerName: string;

  static icon: string;

  static startLogin: (this: void) => void;
  // static completeLogin: () => Promise<void>;

  static refreshAccessToken: (refreshToken: string) => Promise<string>;
  abstract getUserInfo(): Promise<UserInfo>;
  abstract logout(): Promise<void>;
  abstract uploadRecipes(recipes: RecipesState & PersistPartial): Promise<void>;
  abstract downloadRecipes(): Promise<(RecipesState & PersistPartial) | undefined>;
}
