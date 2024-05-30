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
  UpdateItemRequest,
} from './businessTypes';
import {accessToken} from '../../screens/common';

export const BusinessApi = createApi({
  reducerPath: 'BusinessApi',
  baseQuery: fetchBaseQuery({baseUrl: `${env.APP_URL}/business`}),
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
        headers: {
          'x-access-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1YTIxN2M5Yy02YTIwLTQwMzQtYjgyOC1mZDVhODVlMGI4NTciLCJleHAiOjE3MTczNTQzNTAsInR5cGUiOiJhY2Nlc3MifQ.y0sVo7SMLKgF30OEccVe5T5dZtukUEEUoNVReoPK8g4',
          // 'x-access-token': accessToken,
        },
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
        headers: {
          'x-access-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1YTIxN2M5Yy02YTIwLTQwMzQtYjgyOC1mZDVhODVlMGI4NTciLCJleHAiOjE3MTczNTQzNTAsInR5cGUiOiJhY2Nlc3MifQ.y0sVo7SMLKgF30OEccVe5T5dZtukUEEUoNVReoPK8g4',
          // 'x-access-token': accessToken,
        },
      }),
    }),
    getUnits: builder.mutation<string[], GetUnitsRequest>({
      query: body => ({
        url: '/getUnits',
        method: 'POST',
        body: body,
        headers: {
          'x-access-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1YTIxN2M5Yy02YTIwLTQwMzQtYjgyOC1mZDVhODVlMGI4NTciLCJleHAiOjE3MTczNTQzNTAsInR5cGUiOiJhY2Nlc3MifQ.y0sVo7SMLKgF30OEccVe5T5dZtukUEEUoNVReoPK8g4',
        },
      }),
    }),
    addItems: builder.mutation<AddItemResponse, AddItemRequest>({
      query: body => ({
        url: '/addItem',
        method: 'POST',
        body: body,
        headers: {
          'x-access-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1YTIxN2M5Yy02YTIwLTQwMzQtYjgyOC1mZDVhODVlMGI4NTciLCJleHAiOjE3MTczNTQzNTAsInR5cGUiOiJhY2Nlc3MifQ.y0sVo7SMLKgF30OEccVe5T5dZtukUEEUoNVReoPK8g4',
          // 'x-access-token': accessToken,
        },
      }),
    }),
    updateItem: builder.mutation<{message: string}, UpdateItemRequest>({
      query: body => ({
        url: 'updateItem',
        method: 'PUT',
        body: body,
        headers: {
          'x-access-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1YTIxN2M5Yy02YTIwLTQwMzQtYjgyOC1mZDVhODVlMGI4NTciLCJleHAiOjE3MTczNTQzNTAsInR5cGUiOiJhY2Nlc3MifQ.y0sVo7SMLKgF30OEccVe5T5dZtukUEEUoNVReoPK8g4',
          // 'x-access-token': accessToken,
        },
      }),
    }),
    deleteItem: builder.mutation<{message: string}, DeleteItemRequest>({
      query: body => ({
        url: '/deleteItem',
        method: 'DELETE',
        body: body,
        headers: {
          'x-access-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1YTIxN2M5Yy02YTIwLTQwMzQtYjgyOC1mZDVhODVlMGI4NTciLCJleHAiOjE3MTczNTQzNTAsInR5cGUiOiJhY2Nlc3MifQ.y0sVo7SMLKgF30OEccVe5T5dZtukUEEUoNVReoPK8g4',
          // 'x-access-token': accessToken,
        },
      }),
    }),
  }),
});

export const {
  useBusinessTypesQuery,
  useCreateBusinessMutation,
  useGetDefaultItemsMutation,
  useGetUnitsMutation,
  useAddItemsMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = BusinessApi;
