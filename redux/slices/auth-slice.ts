import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

interface InitialState {
  loggedIn: boolean;
  user: User | null;
}

const initialState: InitialState = { loggedIn: false, user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      // state should not be mutated in react, but the @reduxjs/toolkit library permits it
      state.loggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      // state should not be mutated in react, but the @reduxjs/toolkit library permits it
      state.loggedIn = false;
      state.user = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
