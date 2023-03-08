import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { RootState } from '../store/store';

interface Notification {
  status: String;
  title: String;
  message: String;
}

interface InitialState {
  loggedIn: Boolean;
  path: String;
  notification: null | Notification;
}

const initialState: InitialState = {
  loggedIn: false,
  path: '/',
  notification: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      // state should not be mutated in react, but the @reduxjs/toolkit library permits it
      state.loggedIn = true;
    },
    logout(state) {
      // state should not be mutated in react, but the @reduxjs/toolkit library permits it
      state.loggedIn = false;
    },
    updatePath(state, action) {
      // state should not be mutated in react, but the @reduxjs/toolkit library permits it
      state.path = action.payload.path;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  //   extraReducers: {
  //     [HYDRATE]: (state, action) => {
  //       return {
  //         ...state,
  //         ...action.payload.auth,
  //       };
  //     },
  //   },
});

export const authActions = authSlice.actions;

export default authSlice;
