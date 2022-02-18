import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER, PERSIST, persistStore,
} from 'redux-persist';

import recipes from 'store/recipes';
import settings from 'store/settings';
import user from 'store/user';

export const store = configureStore({
  reducer: {
    recipes,
    user,
    settings,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER, PERSIST],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
