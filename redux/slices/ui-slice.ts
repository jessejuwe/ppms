import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

type Notification = {
  status: String;
  title: String;
  message: String;
};

type InitialState = {
  notification: null | Notification;
};

interface Payload {
  status: String;
  title: String;
  message: String;
}

const initialState: InitialState = {
  notification: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateNotification(state, action: PayloadAction<Payload>) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },

    closeNotification(state) {
      state.notification = null;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
