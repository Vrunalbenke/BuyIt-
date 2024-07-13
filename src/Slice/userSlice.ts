import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  userProfileImage: null,
};

const User = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.userData = action.payload;
    },
    setProfileImage(state, action) {
      state.userProfileImage = action.payload;
    },
  },
});

export const {setUser, setProfileImage} = User.actions;
export default User.reducer;
