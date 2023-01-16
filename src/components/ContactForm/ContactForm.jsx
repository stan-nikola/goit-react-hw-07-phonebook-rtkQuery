import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import {
  useGetContactsQuery,
  useAddContactMutation,
  useUpdateContactMutation,
} from 'redux/contactsSlice';
import { toast } from 'react-toastify';
import { mask } from 'constants/phoneValidate';
import { Notification } from 'components/Notifications/Notifications';
import { toastOptions } from 'settings/toastOptions';
import { MdOutlineContactPhone } from 'react-icons/md';
import { FiX } from 'react-icons/fi';
import { schema } from '../../constants/schema';
import BarLoader from 'react-spinners/BarLoader';
import { overrideModal } from 'settings/spinnerSettings';

import {
  PbForm,
  ModalTitle,
  Label,
  LabelName,
  InputField,
  ErrorMessageField,
  SubmitBtn,
  InputMaskField,
  ErrorIcon,
  CloseModalBtn,
  AddContactNotification,
} from './ContactForm.styled';

export const ContactForm = ({ onClose, contactId }) => {
  let initialValues = { name: '', phone: '' };
  const [buttonText, setButtonText] = useState();

  const [addContact, { isLoading: addLoading, error }] =
    useAddContactMutation();
  const [updateContact, { isLoading: updateLoading }] =
    useUpdateContactMutation();
  const { data: items } = useGetContactsQuery();

  if (contactId.currentTarget !== null) {
    const finnedContactById = items.find(item => item.id === contactId);

    initialValues = {
      name: finnedContactById.name,
      phone: finnedContactById.phone,
    };
  }

  const handleSubmit = async (e, { resetForm }) => {
    const nameArray = await items.map(({ name }) => name.toLowerCase());

    if (nameArray.includes(e.name.toLowerCase())) {
      return toast.warn(`${e.name} is already in contacts.`, toastOptions);
    }
    if (error) {
      return toast.error(`${error.data}`, toastOptions);
    }
    if (contactId.currentTarget !== null) {
      console.log(e);
      await updateContact({ id: contactId, ...e });
    } else {
      await addContact(e);
    }

    if (addLoading && updateLoading) {
      resetForm();
    }
  };
  useEffect(() => {
    if (contactId.currentTarget !== null) {
      setButtonText('Update contact');
    } else {
      setButtonText('Add contact');
    }
  }, [contactId.currentTarget]);
  useEffect(() => {
    if (!addLoading && !updateLoading) return;
    return () => {
      onClose();
    };
  }, [addLoading, updateLoading, onClose]);

  return (
    <>
      <CloseModalBtn type="button" onClick={onClose}>
        <FiX />
      </CloseModalBtn>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <PbForm>
          <ModalTitle>Enter name and phone number</ModalTitle>
          <Label>
            <LabelName>Name</LabelName>
            <InputField type="text" name="name" placeholder="Bruce Lee" />
            <ErrorMessage name="name" component="p">
              {message => (
                <ErrorMessageField>
                  {<ErrorIcon />}
                  {message}
                </ErrorMessageField>
              )}
            </ErrorMessage>
          </Label>
          <Label>
            <LabelName>Number</LabelName>
            <InputField name="phone">
              {({ field }) => (
                <InputMaskField
                  {...field}
                  mask={mask}
                  placeholder="(012)-345-6789"
                  type="tel"
                />
              )}
            </InputField>

            <ErrorMessage name="phone" component="p">
              {message => (
                <ErrorMessageField>
                  {<ErrorIcon />}
                  {message}
                </ErrorMessageField>
              )}
            </ErrorMessage>
          </Label>
          {!addLoading && !updateLoading ? (
            <SubmitBtn type="submit">
              <MdOutlineContactPhone />
              {buttonText}
            </SubmitBtn>
          ) : (
            <>
              <BarLoader
                color={'#1d9d00'}
                loading={true}
                cssOverride={overrideModal}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              {addLoading && (
                <AddContactNotification>
                  Adding a contact...
                </AddContactNotification>
              )}
              {updateLoading && (
                <AddContactNotification>
                  Updating a contact...
                </AddContactNotification>
              )}
            </>
          )}
        </PbForm>
      </Formik>
      <Notification />
    </>
  );
};

ContactForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};
