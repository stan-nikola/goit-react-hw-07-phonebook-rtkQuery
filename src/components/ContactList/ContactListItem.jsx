import { useDeleteContactMutation } from 'redux/contactsSlice';
import { BsFillXCircleFill, BsFillPencilFill } from 'react-icons/bs';
import HashLoader from 'react-spinners/HashLoader';
import { ContactList, ContactBtn, ContactName } from './ContactList.styled';
import { overrideSmall } from 'settings/spinnerSettings';

export const ContactListItem = ({ id, name, phone, modalToggle }) => {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  return (
    <ContactList>
      <ContactName>{name}:</ContactName>
      {phone}
      <ContactBtn type="button" onClick={modalToggle}>
        <BsFillPencilFill />
      </ContactBtn>
      {!isLoading ? (
        <ContactBtn type="button" onClick={() => deleteContact(id)}>
          <BsFillXCircleFill />
        </ContactBtn>
      ) : (
        <HashLoader
          color={'red'}
          loading={true}
          cssOverride={overrideSmall}
          size={20}
          margin={1}
          speedMultiplier={2}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </ContactList>
  );
};
