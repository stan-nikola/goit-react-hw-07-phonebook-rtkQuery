import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getContactsFilter } from 'redux/selectors';
import { contactsFilter } from 'redux/contactsFilterSlice';
import { addContact, deleteContact } from 'redux/contactsSlice';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { ContactSearch } from '../contactSearch/contactSearch';
import { Modal } from 'components/Modal/Modal';
import { ModalBtn } from './App.styled';
import { MdOutlineContactPhone } from 'react-icons/md';
import { Box } from 'components/Box/Box';
import { Title, SubTitle, Message } from './App.styled';

export function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getContactsFilter).toLowerCase();

  const [showModal, setShowModal] = useState(false);

  const visibleContacts = useMemo(
    () =>
      contacts.filter(contact => contact.name.toLowerCase().includes(filter)),
    [contacts, filter]
  );

  const onHandleSubmit = e => {
    dispatch(addContact(e));
    setShowModal(!showModal);
  };

  return (
    <Box
      minHeight={450}
      py={2}
      px={3}
      bg="primary"
      maxWidth={740}
      mx="auto"
      as="main"
      borderRadius="normal"
      mt={4}
      boxShadow="main"
    >
      <Box textAline="center" mb={30} as="section">
        <Title>PhoneBook</Title>
        <ModalBtn
          onClick={() => setShowModal(!showModal)}
          aria-label="Add contact"
        >
          <MdOutlineContactPhone /> Add contact
        </ModalBtn>
        {showModal && (
          <Modal onClose={() => setShowModal(!showModal)}>
            <ContactForm
              onSubmit={onHandleSubmit}
              contacts={contacts}
              onClose={() => setShowModal(!showModal)}
            />
          </Modal>
        )}
      </Box>
      <Box as="section">
        <SubTitle>Contacts</SubTitle>
        {contacts.length > 1 && (
          <ContactSearch
            value={filter}
            onChange={e => dispatch(contactsFilter(e.currentTarget.value))}
          />
        )}
        {contacts.length < 1 ? (
          <Message>There are no contacts in your phone book</Message>
        ) : (
            <ContactList
              contacts={visibleContacts}
              onDeleteContact={e => dispatch(deleteContact(e))}
            />
          ) && visibleContacts.length < 1 ? (
          <Message>No matches for your search</Message>
        ) : (
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={e => dispatch(deleteContact(e))}
          />
        )}
      </Box>
    </Box>
  );
}
