import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import env from '../../env';
import {BusinessTypesResponse} from './businessTypes';

export const BusinessApi = createApi({
  reducerPath: 'BusinessApi',
  baseQuery: fetchBaseQuery({baseUrl: `${env.APP_URL}/business`}),
  endpoints: builder => ({
    businessTypes: builder.query<BusinessTypesResponse, null>({
      query: () => '/types',
    }),
  }),
});

export const {useBusinessTypesQuery} = BusinessApi;
