import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  name: string;
  username: string;
  password: string;
}

interface Payload {
  name: string;
  username: string;
  password: string;
}

const initialState: InitialState = { name: '', username: '', password: '' };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    enableUser(state, action: PayloadAction<Payload>) {
      // state should not be mutated in react, but the @reduxjs/toolkit library permits it
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    disableUser(state) {
      // state should not be mutated in react, but the @reduxjs/toolkit library permits it
      state.name = '';
      state.username = '';
      state.password = '';
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
