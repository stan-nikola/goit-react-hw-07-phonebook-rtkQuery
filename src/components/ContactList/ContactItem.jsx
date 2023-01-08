import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { deleteContact } from 'redux/operations';
import { BsFillXCircleFill } from 'react-icons/bs';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { ContactList, ContactBtn, ContactName } from './ContactList.styled';
import { overrideSmall } from 'constants/spinnerSettings';

export const ContactListItem = ({ id, name, phone }) => {
  const { error } = useSelector(getContacts);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const dispatch = useDispatch();

  const onHandleClick = () => {
    dispatch(deleteContact(id));
    setDeleteLoading(true);

    if (error) {
      setDeleteLoading(false);
    }
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
          loading={deleteLoading}
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
