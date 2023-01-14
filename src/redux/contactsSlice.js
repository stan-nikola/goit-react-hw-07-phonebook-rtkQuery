import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://63bac23832d17a50907c9535.mockapi.io',
  }),
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => '/contacts',
    }),
  }),
});

export const { useGetContactsQuery } = contactsApi;
