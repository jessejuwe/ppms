import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Notification = {
  status: String;
  title: String;
  message: String;
};

type InitialState = {
  notification: null | Notification;
  drawerIsOpen: boolean;
};

interface Payload {
  status: String;
  title: String;
  message: String;
}

const initialState: InitialState = {
  notification: null,
  drawerIsOpen: false,
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
    openDrawer(state) {
      state.drawerIsOpen = true;
    },
    closeDrawer(state) {
      state.drawerIsOpen = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
