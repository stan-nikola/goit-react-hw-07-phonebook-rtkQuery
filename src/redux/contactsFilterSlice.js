import { createSlice } from '@reduxjs/toolkit';

export const contactsFilterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    contactsFilter(state, action) {
      return (state = action.payload);
    },
  },
});

export const { contactsFilter } = contactsFilterSlice.actions;
export const contactsFilterReducer = contactsFilterSlice.reducer;
