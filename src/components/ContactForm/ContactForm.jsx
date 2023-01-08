import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Formik, ErrorMessage } from 'formik';
import { getContacts } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { toast } from 'react-toastify';
import { mask } from 'constants/phoneValidate';
import { Notification } from 'components/Notifications/Notifications';
import { toastOptions } from 'settings/toastOptions';
import { MdOutlineContactPhone } from 'react-icons/md';
import { FiX } from 'react-icons/fi';
import { schema } from '../../constants/schema';
import BarLoader from 'react-spinners/BarLoader';
import { overrideModal } from 'constants/spinnerSettings';

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

const initialValues = { name: '', phone: '' };

export const ContactForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector(getContacts);

  const handleSubmit = (e, { resetForm }) => {
    const nameArray = items.map(({ name }) => name.toLowerCase());

    if (nameArray.includes(e.name.toLowerCase())) {
      return toast.warn(`${e.name} is already in contacts.`, toastOptions);
    }
    dispatch(addContact(e));

    if (isLoading) {
      resetForm();
    }
  };

  useEffect(() => {
    if (!isLoading) return;
    return () => {
      onClose();
    };
  }, [isLoading, onClose]);

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
          {!isLoading ? (
            <SubmitBtn type="submit">
              <MdOutlineContactPhone />
              Add contact
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
              <AddContactNotification>
                Adding a contact...
              </AddContactNotification>
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
