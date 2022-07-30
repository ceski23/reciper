import {
  combineReducers,
  configureStore, createListenerMiddleware, PreloadedState, TypedStartListening,
} from '@reduxjs/toolkit';
import {
  FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER, PERSIST, persistStore,
} from 'redux-persist';

import recipes, { addRecipesSyncListener } from 'store/recipes';
import settings from 'store/settings';
import user from 'store/user';

export const listenerMiddleware = createListenerMiddleware();

const rootReducer = combineReducers({
  recipes,
  user,
  settings,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => (
  configureStore({
    preloadedState,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER, PERSIST],
      },
    }).prepend(listenerMiddleware.middleware),
  })
);

export const store = setupStore();
export const persistor = persistStore(store);

export const startAppListening = listenerMiddleware.startListening as AppStartListening;

addRecipesSyncListener(startAppListening);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
