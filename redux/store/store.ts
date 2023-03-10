import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import authSlice from '../slices/auth-slice';
import userSlice from '../slices/user-slice';
import uiSlice from '../slices/ui-slice';

// creating the store
const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [uiSlice.name]: uiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const wrapper = createWrapper<RootState>(store);

export default store;
