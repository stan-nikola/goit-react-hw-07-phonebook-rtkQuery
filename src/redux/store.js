import { configureStore } from '@reduxjs/toolkit';
import { contactsFilterReducer } from './contactsFilterSlice';
import { contactsApi } from './contactsSlice';

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter: contactsFilterReducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
});
