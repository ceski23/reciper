/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { RootState } from 'store';

import { UserInfo } from 'services/accounts/AccountProvider';
import {
  AccountProviderName, getAccountProvider,
} from 'services/accounts/providers';

interface UserState {
  accountInfo?: {
    accessToken: string;
    // refreshToken: string;
    providerName: AccountProviderName;
  };
  userInfo?: UserInfo;
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
        const AccountProvider = getAccountProvider(state.accountInfo.providerName);
        if (!AccountProvider) return;

        const provider = new AccountProvider(state.accountInfo.accessToken);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        provider.logout();
      }

      state.accountInfo = undefined;
      state.userInfo = undefined;
    },
  },
});

export const {
  setAccountProvider, setUserInfo, logoutUser, setAccessToken,
} = slice.actions;

export const selectAccountInfo = (state: RootState) => state.user.accountInfo;
export const selectUserInfo = (state: RootState) => state.user.userInfo;

export default persistReducer({
  key: 'user',
  storage,
}, slice.reducer);
