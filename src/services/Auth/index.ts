import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import env from '../../env';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserResponse,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  ValidateNumberRequest,
  ValidateNumberResponse,
  ValidateOTPRequest,
  ValidateOTPResponse,
} from './authTypes';
import {accessToken} from '../../screens/common';

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: env.APP_URL,
    prepareHeaders: (headers, {endpoint}) => {
      if (endpoint === 'getUser') {
        headers.set('x-access-token', accessToken);
      }
      return headers;
    },
  }),

  tagTypes: [],

  endpoints: builder => ({
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
    validateOTP: builder.mutation<ValidateOTPResponse, ValidateOTPRequest>({
      query: body => ({
        url: 'validateOTP',
        method: 'POST',
        body: body,
      }),
    }),
    createUser: builder.mutation<CreateUserResponse, CreateUserRequest>({
      query: body => ({
        url: 'createUser',
        method: 'POST',
        body: body,
      }),
    }),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: body => ({
        url: 'resetPassword',
        method: 'POST',
        body: body,
      }),
    }),
    getUser: builder.query<GetUserResponse, null>({
      query: () => '/user',
    }),
  }),
});

export const {
  useLoginMutation,
  useValidateMobileNumberMutation,
  useValidateOTPMutation,
  useCreateUserMutation,
  useResetPasswordMutation,
  useGetUserQuery,
} = AuthApi;
