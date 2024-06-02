import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  searchBusinessList: null,
};

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    setSearchBusinessList(state, action) {
      state.searchBusinessList = action.payload;
    },
  },
});

export const {setSearchBusinessList} = businessSlice.actions;
export default businessSlice.reducer;
