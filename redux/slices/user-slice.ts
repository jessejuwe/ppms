import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ForeignAuth {
  name: string;
  email: string;
  uid: string;
  photoURL: string;
}

interface LocalAuth {
  name: string;
  username: string;
  password: string;
}

interface InitialState {
  foreignAuth: ForeignAuth;
  localAuth: LocalAuth;
}

interface Payload {
  name: string;
  username: string;
  password: string;
}

interface ForeignPayload {
  name: string;
  email: string;
  uid: string;
  photoURL: string;
}

const initialState: InitialState = {
  foreignAuth: { name: '', email: '', uid: '', photoURL: '' },
  localAuth: { name: '', username: '', password: '' },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    enableUserForeign(state, action: PayloadAction<ForeignPayload>) {
      // state should not be mutated in react, but the @reduxjs/toolkit library permits it
      state.foreignAuth.name = action.payload.name;
      state.foreignAuth.email = action.payload.email;
      state.foreignAuth.uid = action.payload.uid;
      state.foreignAuth.photoURL = action.payload.photoURL;
    },
    disableUserForeign(state) {
      // state should not be mutated in react, but the @reduxjs/toolkit library permits it
      state.foreignAuth.name = '';
      state.foreignAuth.email = '';
      state.foreignAuth.uid = '';
      state.foreignAuth.photoURL = '';
    },
    enableUserLocal(state, action: PayloadAction<Payload>) {
      // state should not be mutated in react, but the @reduxjs/toolkit library permits it
      state.localAuth.name = action.payload.name;
      state.localAuth.username = action.payload.username;
      state.localAuth.password = action.payload.password;
    },
    disableUserLocal(state) {
      // state should not be mutated in react, but the @reduxjs/toolkit library permits it
      state.localAuth.name = '';
      state.localAuth.username = '';
      state.localAuth.password = '';
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
