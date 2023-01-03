import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { ContactSearch } from '../contactSearch/contactSearch';
import { Modal } from 'components/Modal/Modal';
import { Box } from 'components/Box/Box';
import { ModalBtn } from './App.styled';
import { MdOutlineContactPhone } from 'react-icons/md';
import { Title, SubTitle } from './App.styled';

export function App() {
  const contacts = useSelector(getContacts);
  const [showModal, setShowModal] = useState(false);

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
            <ContactForm onClose={() => setShowModal(!showModal)} />
          </Modal>
        )}
      </Box>
      <Box as="section">
        <SubTitle>Contacts</SubTitle>
        {contacts.length > 1 && <ContactSearch />}
        <ContactList />
      </Box>
    </Box>
  );
}
