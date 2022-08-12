/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { RootState } from 'store';

import { UserInfo } from 'services/accounts/AccountProvider';
import {
  AccountProviders, chooseAccountProvider,
} from 'services/accounts/providers';

interface UserState {
  accountInfo?: {
    accessToken: string;
    // refreshToken: string;
    type: AccountProviders;
  };
  userInfo?: UserInfo;
  // shoppingList?: TaskListInfo;
}

const initialState: UserState = {};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccountProvider: (state, { payload }: PayloadAction<UserState['accountInfo']>) => {
      state.accountInfo = payload;
    },
    setAccessToken: (state, { payload }: PayloadAction<string>) => {
      if (state.accountInfo) state.accountInfo.accessToken = payload;
    },
    setUserInfo: (state, { payload }: PayloadAction<UserState['userInfo']>) => {
      state.userInfo = payload;
    },
    logoutUser: (state) => {
      if (state.accountInfo) {
        const providerType = chooseAccountProvider(state.accountInfo?.type);
        // eslint-disable-next-line new-cap
        const provider = new providerType(state.accountInfo.accessToken);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        provider.logout();
      }

      state.accountInfo = undefined;
      state.userInfo = undefined;
      // state.shoppingList = undefined;
    },
    // setShoppingList: (state, { payload }: PayloadAction<UserState['shoppingList']>) => {
    //   state.shoppingList = payload;
    // },
  },
});

export const {
  setAccountProvider, setUserInfo, logoutUser, setAccessToken,
} = slice.actions;

export const selectAccountInfo = (state: RootState) => state.user.accountInfo;
export const selectUserInfo = (state: RootState) => state.user.userInfo;
// export const selectShoppingList = (state: RootState) => state.user.shoppingList;

export default persistReducer({
  key: 'user',
  storage,
}, slice.reducer);
