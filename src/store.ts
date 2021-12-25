import { configureStore } from '@reduxjs/toolkit';
import recipes from 'features/recipes';
import user from 'features/user';
import settings from 'features/settings';
import {
  FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER, PERSIST, persistStore,
} from 'redux-persist';

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
