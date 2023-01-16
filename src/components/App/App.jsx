import { useState } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { ContactSearch } from '../contactSearch/ContactSearch';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { Modal } from 'components/Modal/Modal';
import { Box } from 'components/Box/Box';
import { ModalBtn } from './App.styled';
import { toast } from 'react-toastify';
import { Notification } from 'components/Notifications/Notifications';
import { toastOptionsMain } from 'settings/toastOptions';
import { MdOutlineContactPhone } from 'react-icons/md';
import { Title, SubTitle } from './App.styled';
import { overrideMain } from 'settings/spinnerSettings';
import { useGetContactsQuery } from 'redux/contactsSlice';

export function App() {
  const { data, error, isLoading } = useGetContactsQuery();
  const [showModal, setShowModal] = useState(false);
  const [contactId, setContactId] = useState('null');

  const modalToggle = id => {
    setShowModal(!showModal);
    setContactId(id);
  };
  if (error) {
    toast.error(`Ups...${error.data}`, toastOptionsMain);
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
        <ModalBtn onClick={modalToggle} aria-label="Add contact">
          <MdOutlineContactPhone /> Add contact
        </ModalBtn>
        {showModal && (
          <Modal onClose={modalToggle}>
            <ContactForm onClose={modalToggle} contactId={contactId} />
          </Modal>
        )}
      </Box>
      <Box as="section">
        <SubTitle>Contacts</SubTitle>
        {data && data?.length > 1 && <ContactSearch />}
        {data && <ContactList modalToggle={modalToggle} />}
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
