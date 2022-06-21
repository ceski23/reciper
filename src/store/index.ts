import {
  configureStore, createListenerMiddleware, TypedStartListening,
} from '@reduxjs/toolkit';
import {
  FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER, PERSIST, persistStore,
} from 'redux-persist';

import recipes, { addRecipesSyncListener } from 'store/recipes';
import settings from 'store/settings';
import user from 'store/user';

export const listenerMiddleware = createListenerMiddleware();

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
  }).prepend(listenerMiddleware.middleware),
});

export const startAppListening = listenerMiddleware.startListening as AppStartListening;

addRecipesSyncListener(startAppListening);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const persistor = persistStore(store);
