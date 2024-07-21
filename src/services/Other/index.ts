import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import env from '../../env';
import {accessToken} from '../../screens/common';

export const OtherAPI = createApi({
  reducerPath: 'OtherAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: env.APP_URL,
    // prepareHeaders: (headers, {endpoint}) => {},
  }),
  endpoints: builder => ({
    postReview: builder.mutation({
      query: body => ({
        url: '/feedback',
        method: 'POST',
        body: body,
        headers: {
          'x-access-token': accessToken,
        },
      }),
    }),
  }),
});

export const {usePostReviewMutation} = OtherAPI;
