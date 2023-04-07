import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Notification = {
  status: string;
  title: string;
  message: string;
};

type InitialState = {
  notification: null | Notification;
  drawerIsOpen: boolean;
};

interface Payload {
  status: string;
  title: string;
  message: string;
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
