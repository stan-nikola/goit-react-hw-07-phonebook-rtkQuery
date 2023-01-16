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
import { toastOptionsMain, toastOptionsWarn } from 'settings/toastOptions';
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
  let initialValues = { name: '', phone: 0 };

  const [buttonText, setButtonText] = useState();
  const [addContact, { isLoading: addLoading, error: addError }] =
    useAddContactMutation();
  const [updateContact, { isLoading: updateLoading, error: updateError }] =
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
    const duplicateContactData = items.find(
      item => item.name === e.name || item.phone === e.phone
    );

    if (
      duplicateContactData?.name === e.name &&
      duplicateContactData?.phone === e.phone
    ) {
      toast.warning(
        `${duplicateContactData.name} with ${duplicateContactData.phone} already exist on your phone book, please check`,
        toastOptionsWarn
      );
      return;
    }

    if (addError || updateError) {
      return toast.error(
        `${addError.status || updateError.status} `,
        toastOptionsMain
      );
    }
    if (contactId.currentTarget !== null) {
      await updateContact({ id: contactId, ...e });
      toast.success(`${e.name}  ${e.phone} updated`, toastOptionsMain);
    } else {
      await addContact(e);
      toast.success(`${e.name} ${e.phone} added`, toastOptionsMain);
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
                  placeholder="+3 8-(123)-456-7890"
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
