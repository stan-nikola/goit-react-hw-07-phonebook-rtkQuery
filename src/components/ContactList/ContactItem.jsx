import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { BsFillXCircleFill } from 'react-icons/bs';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { ContactList, ContactBtn, ContactName } from './ContactList.styled';
import { overrideSmall } from 'constants/spinnerSettings';

export const ContactListItem = ({ id, name, phone }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const dispatch = useDispatch();

  const onHandleClick = () => {
    dispatch(deleteContact(id));
    setDeleteLoading(true);
  };

  return (
    <ContactList>
      <ContactName>{name}:</ContactName>
      {phone}
      {!deleteLoading ? (
        <ContactBtn type="button" onClick={onHandleClick}>
          <BsFillXCircleFill />
        </ContactBtn>
      ) : (
        <PacmanLoader
          color={'red'}
          cssOverride={overrideSmall}
          size={12}
          margin={1}
          speedMultiplier={2}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </ContactList>
  );
};
