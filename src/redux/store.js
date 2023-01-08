import { configureStore } from '@reduxjs/toolkit';

import { contactsReducer } from './contactsSlice';
import { contactsFilterReducer } from './contactsFilterSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: contactsFilterReducer,
  },
});
