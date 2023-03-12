import { SignInData, SignUpData } from '@/model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  loggedIn: boolean;
  users: SignInData[];
}

const initialState: InitialState = { loggedIn: false, users: [] };

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
    updateUsers(state, action: PayloadAction<SignInData[]>) {
      state.users = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
