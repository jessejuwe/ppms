import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface InitialState {
  username: String | null;
  password: String | null;
}

interface Payload {
  username: String;
  password: String;
}

const initialState: InitialState = { username: '', password: '' };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    enableUser(state, action: PayloadAction<Payload>) {
      // state should not be mutated in react, but the @reduxjs/toolkit library permits it
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    disableUser(state) {
      // state should not be mutated in react, but the @reduxjs/toolkit library permits it
      state.username = null;
      state.password = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
