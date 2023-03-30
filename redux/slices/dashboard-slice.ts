import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Active {
  alpha: string;
  beta: string | null;
}

interface InitialState {
  active: Active;
  drawer: string;
}

const initialState: InitialState = {
  active: { alpha: 'Dashboard', beta: null },
  drawer: 'Dashboard',
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setActive(state, action: PayloadAction<Active>) {
      // state should not be mutated in react, but the @reduxjs/toolkit library permits it
      state.active = action.payload;
    },
    clearActive(state) {
      state.active = { alpha: 'Dashboard', beta: null };
    },
    setDrawer(state, action: PayloadAction<string>) {
      // state should not be mutated in react, but the @reduxjs/toolkit library permits it
      state.drawer = action.payload;
    },
    clearDrawer(state) {
      state.drawer = 'Dashboard';
    },
  },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice;
