import {configureStore} from '@reduxjs/toolkit';
import {AuthApi} from './services/Auth';
import {BusinessApi} from './services/Business';
import businessReducer from './Slice/businessSlice';
import userReducer from './Slice/userSlice';

export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [BusinessApi.reducerPath]: BusinessApi.reducer,
    business: businessReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(AuthApi.middleware)
      .concat(BusinessApi.middleware),
});
