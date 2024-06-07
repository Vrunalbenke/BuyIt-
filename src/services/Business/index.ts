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
import {accessToken, refreshToken} from '../../screens/common';

export const BusinessApi = createApi({
  reducerPath: 'BusinessApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${env.APP_URL}/business`,
    prepareHeaders: (headers, {endpoint}) => {
      if (endpoint !== 'businessTypes' && accessToken) {
        headers.set('x-access-token', accessToken);
      }
      if (
        endpoint === 'markFavouriteBusinessType' ||
        endpoint === 'getFavouriteBusinesses'
      ) {
        headers.set('x-refresh-token', refreshToken);
      }
      return headers;
    },
  }),
  tagTypes: ['favoriteBusinessType', 'favoriteBusiness'],
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
    getFavoriteBusiness: builder.query<SearchBusinessResponse[], null>({
      query: () => '/getFavouriteBusinesses',
      providesTags: ['favoriteBusiness'],
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
    businessByType: builder.query<
      SearchBusinessResponse[],
      {business_type: string; latitude?: number; longitude?: number}
    >({
      query: body =>
        `/type?business_type=${body.business_type}&latitude=${body.latitude}&longitude=${body.longitude}`,
    }),
    markFavoriteBusiness: builder.mutation({
      query: body => ({
        url: '/markFavouriteBusiness',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['favoriteBusiness'],
    }),
  }),
});

export const {
  useBusinessTypesQuery,
  useGetFavoriteBusinessTypesQuery,
  useGetFavoriteBusinessQuery,
  useCreateBusinessMutation,
  useGetDefaultItemsMutation,
  useGetUnitsMutation,
  useAddItemsMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useMarkFavoriteBusinessTypeMutation,
  useMarkFavoriteBusinessMutation,
  useSearchBusinessMutation,
  useBusinessByTypeQuery,
} = BusinessApi;
