import { deleteContact } from 'redux/contactsSlice';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { useSelector } from 'react-redux';
import { getContactsFilter } from 'redux/selectors';
import { Box } from './../Box/Box';
import { BsFillXCircleFill } from 'react-icons/bs';
import {
  ContactItem,
  ContactBtn,
  ContactName,
  Message,
} from './ContactList.styled';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getContactsFilter).toLowerCase();

  const visibleContacts = useMemo(
    () =>
      contacts.filter(contact => contact.name.toLowerCase().includes(filter)),
    [contacts, filter]
  );
  if (contacts.length < 1) {
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
      {visibleContacts.map(({ id, name, number }) => {
        return (
          <ContactItem key={id}>
            <ContactName>{name}:</ContactName>
            {number}
            <ContactBtn
              type="button"
              onClick={() => dispatch(deleteContact(id))}
            >
              <BsFillXCircleFill />
            </ContactBtn>
          </ContactItem>
        );
      })}
    </Box>
  );
};
