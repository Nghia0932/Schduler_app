import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface BottomTabState {
  isCloseBottomTab: boolean;
}

const initialState: BottomTabState = {
  isCloseBottomTab: false,
};

const bottomTabSlice = createSlice({
  name: 'bottomTab',
  initialState,
  reducers: {
    setIsCloseBottomTab(state, action: PayloadAction<boolean>) {
      state.isCloseBottomTab = action.payload;
    },
  },
});

export const {setIsCloseBottomTab} = bottomTabSlice.actions;

export default bottomTabSlice.reducer;
