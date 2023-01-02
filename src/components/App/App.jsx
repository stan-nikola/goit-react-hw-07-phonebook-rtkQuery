import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { MdOutlineContactPhone } from 'react-icons/md';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { getContacts, getContactsFilter } from 'redux/selectors';
import { addContact, deleteContact } from 'redux/contactsSlice';
import { contactsFilter } from 'redux/contactsFilterSlice';

import { Box } from 'components/Box/Box';
import { Title, SubTitle, Message } from './App.styled';
import { Modal } from 'components/Modal/Modal';
import { ModalBtn } from './App.styled';

export function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getContactsFilter);

  const [showModal, setShowModal] = useState(false);

  const getVisibleContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
    return visibleContacts;
  };

  const onHandleSubmit = e => {
    dispatch(addContact(e));
    toggleModal();
  };

  const toggleModal = () => {
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
        <ModalBtn onClick={toggleModal} aria-label="Add contact">
          <MdOutlineContactPhone /> Add contact
        </ModalBtn>
        {showModal && (
          <Modal onClose={toggleModal}>
            <ContactForm
              onSubmit={onHandleSubmit}
              contactsArr={contacts}
              onClose={toggleModal}
            />
          </Modal>
        )}
      </Box>
      <Box as="section">
        <SubTitle>Contacts</SubTitle>
        {contacts.length > 1 && (
          <Filter
            value={filter}
            onChange={e => dispatch(contactsFilter(e.currentTarget.value))}
          />
        )}
        {contacts.length < 1 ? (
          <Message>There are no contacts in your phonebook</Message>
        ) : (
            <ContactList
              contacts={getVisibleContacts()}
              onDeleteContact={e => dispatch(deleteContact(e))}
            />
          ) && getVisibleContacts().length < 1 ? (
          <Message>No matches for your search</Message>
        ) : (
          <ContactList
            contacts={getVisibleContacts()}
            onDeleteContact={e => dispatch(deleteContact(e))}
          />
        )}
      </Box>
    </Box>
  );
}
