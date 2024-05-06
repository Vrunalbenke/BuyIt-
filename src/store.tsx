import {configureStore} from '@reduxjs/toolkit';
import {AuthApi} from './services/Auth';

export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(AuthApi.middleware),
});
