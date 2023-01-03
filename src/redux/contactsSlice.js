import { createSlice, nanoid } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import data from '../data/data.json';

const persistConfig = {
  key: 'contacts',
  storage,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contactsData: data },

  reducers: {
    addContact: {
      reducer(state, action) {
        state.contactsData.push(action.payload);
      },
      prepare({ name, number }) {
        return {
          payload: {
            id: nanoid(),
            name,
            number,
          },
        };
      },
    },
    deleteContact(state, action) {
      const index = state.contactsData.findIndex(
        contact => contact.id === action.payload
      );
      state.contactsData.splice(index, 1);
    },
  },
});

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContact } = contactsSlice.actions;
