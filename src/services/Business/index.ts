import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import env from '../../env';
import {
  AddItemRequest,
  AddItemResponse,
  BusinessTypesResponse,
  CreateBusinessRequest,
  CreateBusinessResponse,
  DeleteItemRequest,
  GetDefaultItemsRequest,
  GetDefaultItemsResponse,
  GetUnitsRequest,
  SearchBusinessRequest,
  SearchBusinessResponse,
  UpdateItemRequest,
} from './businessTypes';
import {accessToken} from '../../screens/common';

export const BusinessApi = createApi({
  reducerPath: 'BusinessApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${env.APP_URL}/business`,
    prepareHeaders: (headers, {endpoint}) => {
      if (endpoint !== 'businessTypes' && accessToken) {
        headers.set(
          'x-access-token',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI4YTQ1ZDM5ZC1iZTRmLTQ2ZjQtYWExNy1iMzdmNTY1MjBjYmEiLCJleHAiOjE3MTc1OTg5OTgsInR5cGUiOiJhY2Nlc3MifQ.5Ss3HC-rTs2qNDnETgkWLKqf1eUx9yF3q2Gz116oCag',
        );
      }
      if (endpoint === 'markFavouriteBusinessType') {
        headers.set(
          'x-refresh-token',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI4YTQ1ZDM5ZC1iZTRmLTQ2ZjQtYWExNy1iMzdmNTY1MjBjYmEiLCJleHAiOjE3MzQ1MTg5OTgsInR5cGUiOiJyZWZyZXNoIn0.ny7401rpmA0s9hZoCpSxsEIjq7IpsK7rkwT59iF2QrA',
        );
      }
      return headers;
    },
  }),
  tagTypes: ['favoriteBusinessType'],
  endpoints: builder => ({
    businessTypes: builder.query<BusinessTypesResponse, null>({
      query: () => '/types',
    }),
    createBusiness: builder.mutation<
      CreateBusinessResponse[],
      CreateBusinessRequest
    >({
      query: body => ({
        url: '/create',
        method: 'POST',
        body: body,
      }),
    }),
    getDefaultItems: builder.mutation<
      GetDefaultItemsResponse,
      GetDefaultItemsRequest
    >({
      query: body => ({
        url: '/getDefaultItems',
        method: 'POST',
        body: body,
      }),
    }),
    getUnits: builder.mutation<string[], GetUnitsRequest>({
      query: body => ({
        url: '/getUnits',
        method: 'POST',
        body: body,
      }),
    }),
    addItems: builder.mutation<AddItemResponse, AddItemRequest>({
      query: body => ({
        url: '/addItem',
        method: 'POST',
        body: body,
      }),
    }),
    updateItem: builder.mutation<{message: string}, UpdateItemRequest>({
      query: body => ({
        url: 'updateItem',
        method: 'PUT',
        body: body,
      }),
    }),
    deleteItem: builder.mutation<{message: string}, DeleteItemRequest>({
      query: body => ({
        url: '/deleteItem',
        method: 'DELETE',
        body: body,
      }),
    }),
    getFavoriteBusinessTypes: builder.query<string[], null>({
      query: () => '/getFavouriteBusinessTypes',
      providesTags: ['favoriteBusinessType'],
    }),
    markFavoriteBusinessType: builder.mutation({
      query: body => ({
        url: '/markFavouriteBusinessType',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['favoriteBusinessType'],
    }),
    searchBusiness: builder.mutation<
      SearchBusinessResponse[],
      SearchBusinessRequest
    >({
      query: body => ({
        url: `/search?searchString=${body.searchString}&latitude=${body.latitude}&longitude=${body.longitude}&radius=${body.searchRadius}&useLocation=${body.useLocation}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useBusinessTypesQuery,
  useGetFavoriteBusinessTypesQuery,
  useCreateBusinessMutation,
  useGetDefaultItemsMutation,
  useGetUnitsMutation,
  useAddItemsMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useMarkFavoriteBusinessTypeMutation,
  useSearchBusinessMutation,
} = BusinessApi;
