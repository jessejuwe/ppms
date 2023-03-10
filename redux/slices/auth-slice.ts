import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface InitialState {
  loggedIn: boolean;
  path: String;
}

interface Payload {
  path: String;
}

const initialState: InitialState = {
  loggedIn: false,
  path: '/',
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
    updatePath(state, action: PayloadAction<Payload>) {
      // state should not be mutated in react, but the @reduxjs/toolkit library permits it
      state.path = action.payload.path;
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
