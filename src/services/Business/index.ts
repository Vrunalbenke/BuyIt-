import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import env from '../../env';
import {
  AddItemRequest,
  AddItemResponse,
  BusinessTypesResponse,
  CreateBusinessRequest,
  CreateBusinessResponse,
  GetDefaultItemsRequest,
  GetDefaultItemsResponse,
  GetUnitsRequest,
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
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1YTIxN2M5Yy02YTIwLTQwMzQtYjgyOC1mZDVhODVlMGI4NTciLCJleHAiOjE3MTcyNzUxNzQsInR5cGUiOiJhY2Nlc3MifQ.-aErXTcPO4NDIBlxRgSiG1UfNkpNEhvJqjBRm1hQi3A',
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
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1YTIxN2M5Yy02YTIwLTQwMzQtYjgyOC1mZDVhODVlMGI4NTciLCJleHAiOjE3MTcyNzUxNzQsInR5cGUiOiJhY2Nlc3MifQ.-aErXTcPO4NDIBlxRgSiG1UfNkpNEhvJqjBRm1hQi3A',
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
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1YTIxN2M5Yy02YTIwLTQwMzQtYjgyOC1mZDVhODVlMGI4NTciLCJleHAiOjE3MTY5OTE5MTAsInR5cGUiOiJhY2Nlc3MifQ.LT-DwMCbUHK5um2Hmc5Cq5Qbz9BGaB_0W7pOA1_mopE',
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
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1YTIxN2M5Yy02YTIwLTQwMzQtYjgyOC1mZDVhODVlMGI4NTciLCJleHAiOjE3MTY5OTE5MTAsInR5cGUiOiJhY2Nlc3MifQ.LT-DwMCbUHK5um2Hmc5Cq5Qbz9BGaB_0W7pOA1_mopE',
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
} = BusinessApi;
