import {configureStore} from '@reduxjs/toolkit';
import {AuthApi} from './services/Auth';
import {BusinessApi} from './services/Business';

export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [BusinessApi.reducerPath]: BusinessApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(AuthApi.middleware)
      .concat(BusinessApi.middleware),
});
