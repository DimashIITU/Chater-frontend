import { userType } from '../../utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';

export interface UserState {
  data: userType | null;
}

const initialState: UserState = {
  data: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<userType>) {
      state.data = action.payload;
    },
    setUserImg(state, action: PayloadAction<string>) {
      state.data.avatarUrl = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.data = action.payload.user.data;
    },
  },
});

export const { setUserData, setUserImg } = userSlice.actions;

export const selectUserData = (state: AppState) => state.user.data;

export default userSlice.reducer;
