import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import env from '../../env';

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({baseUrl: env.APP_URL}),
  tagTypes: [],
  endpoints: builder => ({
    signIn: builder.query<void, string>({
      query: () => '/login',
      providesTags: [],
    }),
  }),
});

export const {useSignInQuery} = AuthApi;
