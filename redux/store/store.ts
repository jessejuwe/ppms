import {
  configureStore,
  combineReducers,
  Reducer,
  CombinedState,
  AnyAction,
} from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import authSlice from '../slices/auth-slice';
import dashboardSlice from '../slices/dashboard-slice';
import uiSlice from '../slices/ui-slice';

const isClient = typeof window !== 'undefined';

type AuthState = ReturnType<typeof authSlice.getInitialState>;
type DashboardState = ReturnType<typeof dashboardSlice.getInitialState>;
type UIState = ReturnType<typeof uiSlice.getInitialState>;

let rootReducer: Reducer<
  CombinedState<{
    auth: AuthState;
    dashboard: DashboardState;
    ui: UIState;
  }>,
  AnyAction
>;

/* COMBINE REDUCERS */
const combinedReducers = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [dashboardSlice.name]: dashboardSlice.reducer,
  [uiSlice.name]: uiSlice.reducer,
});

if (isClient) {
  const { persistReducer } = require('redux-persist');
  const storage = require('redux-persist/lib/storage').default;

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  };

  rootReducer = persistReducer(persistConfig, combinedReducers);
} else {
  rootReducer = combinedReducers;
}

// creating the store
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // prettier-ignore
        // Ignore these action types
        ignoredActions: ['auth/login', FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.user', 'payload'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
