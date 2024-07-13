import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import env from '../../env';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserResponse,
  LoginRequest,
  LoginResponse,
  RPasswordRequest,
  RPasswordResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  ValidateNumberRequest,
  ValidateNumberResponse,
  ValidateOTPRequest,
  ValidateOTPResponse,
  USRadiusRequest,
  USRadiusResponse,
} from './authTypes';
import {accessToken, refreshToken} from '../../screens/common';

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: env.APP_URL,
    prepareHeaders: (headers, {endpoint}) => {
      if (endpoint === 'getUser') {
        headers.set('x-access-token', accessToken);
      } else if (endpoint === 'updateUser') {
        headers.set('x-access-token', accessToken);
      }
      return headers;
    },
  }),

  tagTypes: ['user'],

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
    resetPassword: builder.mutation<RPasswordResponse, RPasswordRequest>({
      query: body => ({
        url: 'resetPassword',
        method: 'POST',
        body: body,
      }),
    }),
    getUser: builder.query<GetUserResponse, null>({
      query: () => '/user',
      providesTags: ['user'],
    }),
    updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: body => ({
        url: 'user/update',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['user'],
    }),
    updateSearchRadius: builder.mutation<USRadiusResponse, USRadiusRequest>({
      query: body => ({
        url: '/user/update_search_radius',
        method: 'POST',
        body: body,
        headers: {
          'x-access-token': accessToken,
          'x-refresh-token': refreshToken,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useValidateMobileNumberMutation,
  useValidateOTPMutation,
  useCreateUserMutation,
  useResetPasswordMutation,
  useLazyGetUserQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateSearchRadiusMutation,
} = AuthApi;
