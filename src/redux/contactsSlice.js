import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://63bac23832d17a50907c9535.mockapi.io';

export const contactsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
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
    updateContact: build.mutation({
      query(fields) {
        return {
          url: `/contacts/${fields.id}`,
          method: 'PUT',
          body: fields,
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
  useUpdateContactMutation,
} = contactsApi;
