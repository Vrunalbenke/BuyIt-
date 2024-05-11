import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import env from '../../env';
import {
  LoginRequest,
  LoginResponse,
  ValidateNumberRequest,
  ValidateNumberResponse,
} from './authTypes';

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({baseUrl: env.APP_URL}),
  tagTypes: [],
  endpoints: builder => ({
    signIn: builder.query<void, string>({
      query: () => '/login',
      providesTags: [],
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: body => ({
        url: 'login',
        method: 'POST',
        body: body,
      }),
    }),
    validateMobileNumber: builder.mutation<
      ValidateNumberResponse,
      ValidateNumberRequest
    >({
      query: body => ({
        url: 'validateMobileNumber',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const {
  useSignInQuery,
  useLoginMutation,
  useValidateMobileNumberMutation,
} = AuthApi;
