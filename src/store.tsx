import {configureStore} from '@reduxjs/toolkit';
import {AuthApi} from './services/Auth';
import {BusinessApi} from './services/Business';
import businessReducer from './Slice/businessSlice';

export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [BusinessApi.reducerPath]: BusinessApi.reducer,
    business: businessReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(AuthApi.middleware)
      .concat(BusinessApi.middleware),
});
