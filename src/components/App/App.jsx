import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { ContactSearch } from '../contactSearch/contactSearch';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { Modal } from 'components/Modal/Modal';
import { Box } from 'components/Box/Box';
import { ModalBtn } from './App.styled';
import { toast } from 'react-toastify';
import { Notification } from 'components/Notifications/Notifications';
import { toastOptions } from 'settings/toastOptions';
import { MdOutlineContactPhone } from 'react-icons/md';
import { Title, SubTitle } from './App.styled';
import { overrideMain } from 'constants/spinnerSettings';

export function App() {
  const { items, isLoading, error } = useSelector(getContacts);
  const [showModal, setShowModal] = useState(false);

  if (error) {
    toast.warn(`Ups...${error}`, toastOptions);
  }
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
        {items.length > 1 && <ContactSearch />}
        <ContactList />
      </Box>
      <PropagateLoader
        color={'#ff0000'}
        loading={isLoading}
        cssOverride={overrideMain}
        size={15}
        speedMultiplier={2}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <Notification />
    </Box>
  );
}
