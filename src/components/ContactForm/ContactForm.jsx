import PropTypes from 'prop-types';
import { Formik, ErrorMessage } from 'formik';
import { getContacts } from 'redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { toast } from 'react-toastify';
import { mask } from 'constants/phoneValidate';
import { Notification } from 'components/Notifications/Notifications';
import { toastOptions } from 'settings/toastOptions';
import { MdOutlineContactPhone } from 'react-icons/md';
import { FiX } from 'react-icons/fi';
import { schema } from '../../constants/schema';

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
} from './ContactForm.styled';

const initialValues = { name: '', number: '' };

export const ContactForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = (e, { resetForm }) => {
    const nameArray = contacts.map(({ name }) => name.toLowerCase());

    if (nameArray.includes(e.name.toLowerCase())) {
      return toast.warn(`${e.name} is already in contacts.`, toastOptions);
    }

    dispatch(addContact(e));
    resetForm();
    onClose();
  };

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
            <InputField name="number">
              {({ field }) => (
                <InputMaskField
                  {...field}
                  mask={mask}
                  placeholder="(012)-345-6789"
                  type="tel"
                />
              )}
            </InputField>

            <ErrorMessage name="number" component="p">
              {message => (
                <ErrorMessageField>
                  {<ErrorIcon />}
                  {message}
                </ErrorMessageField>
              )}
            </ErrorMessage>
          </Label>
          <SubmitBtn type="submit">
            <MdOutlineContactPhone />
            Add contact
          </SubmitBtn>
        </PbForm>
      </Formik>
      <Notification />
    </>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
