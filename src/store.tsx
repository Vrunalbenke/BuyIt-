import {configureStore} from '@reduxjs/toolkit';
import {AuthApi} from './services/Auth';
import {BusinessApi} from './services/Business';
import businessReducer from './Slice/businessSlice';
import userReducer from './Slice/userSlice';
import {OtherAPI} from './services/Other';

export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [BusinessApi.reducerPath]: BusinessApi.reducer,
    [OtherAPI.reducerPath]: OtherAPI.reducer,
    business: businessReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(AuthApi.middleware)
      .concat(BusinessApi.middleware)
      .concat(OtherAPI.middleware),
});
