import { useSelector, useDispatch } from 'react-redux';
import { getContactsFilter } from 'redux/selectors';
import { contactsFilter } from 'redux/contactsFilterSlice';
import { LabelName } from 'components/ContactForm/ContactForm.styled';
import { SearchLabel, InputSearchField } from './ContactSearch.styled';

export const ContactSearch = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getContactsFilter);

  return (
    <SearchLabel>
      <LabelName>Finds contacts by name</LabelName>
      <InputSearchField
        type="text"
        name="filter"
        value={filter}
        onChange={e => dispatch(contactsFilter(e.target.value))}
      />
    </SearchLabel>
  );
};
