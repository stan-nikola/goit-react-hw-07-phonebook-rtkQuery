// import { deleteContact } from 'redux/contactsSlice';
import { useMemo } from 'react';
import { useGetContactsQuery } from 'redux/contactsSlice';
import { useSelector } from 'react-redux';
import { getContactsFilter } from 'redux/selectors';

import { Box } from './../Box/Box';
import { Message } from './ContactList.styled';
import { ContactListItem } from './ContactListItem';

export const ContactList = ({ modalToggle }) => {
  const { data } = useGetContactsQuery();
  const filter = useSelector(getContactsFilter).toLowerCase();

  const visibleContacts = useMemo(
    () => data.filter(item => item.name.toLowerCase().includes(filter)),
    [data, filter]
  );
  if (data.length < 1) {
    return <Message>There are no contacts in your phone book</Message>;
  }
  if (visibleContacts.length < 1) {
    return <Message>No matches for your search</Message>;
  }

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      gridGap={15}
      as="ul"
      bg="third"
      borderRadius="normal"
      boxShadow="items"
      p={2}
    >
      {visibleContacts.map(item => {
        return (
          <ContactListItem
            key={item.id}
            modalToggle={() => modalToggle(item.id)}
            {...item}
          ></ContactListItem>
        );
      })}
    </Box>
  );
};
