import { createSlice } from '@reduxjs/toolkit';

import data from '../data/data.json';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: data,
  reducers: {
    addContact(state, action) {
      state.push(action.payload);
    },
    deleteContact(state, action) {
      state.splice(action.payload, 1);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
