import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://63bac23832d17a50907c9535.mockapi.io',
  }),
  tagTypes: ['Contact'],
  endpoints: build => ({
    getContacts: build.query({
      query: () => '/contacts',
      providesTags: ['Contact'],
    }),
    addContact: build.mutation({
      query(body) {
        return {
          url: '/contacts',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Contact'],
    }),
    deleteContact: build.mutation({
      query(id) {
        return {
          url: `contacts/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = contactsApi;
