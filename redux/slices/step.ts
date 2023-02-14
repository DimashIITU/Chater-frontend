import { AppState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  step: 0,
};

export const stepSlice = createSlice({
  name: 'stepSlice',
  initialState,
  reducers: {
    onNextStep(state, action: PayloadAction<null | number>) {
      action.payload ? (state.step = state.step + action.payload) : (state.step = state.step + 1);
    },
  },
});

export const { onNextStep } = stepSlice.actions;

export const selectStep = (state: AppState) => state.step.step;

export default stepSlice.reducer;
