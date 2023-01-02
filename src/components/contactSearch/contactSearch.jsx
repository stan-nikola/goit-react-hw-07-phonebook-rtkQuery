import { LabelName } from 'components/ContactForm/ContactForm.styled';
import PropTypes from 'prop-types';
import { SearchLabel, InputSearchField } from './contactSearch.styled';

export const ContactSearch = ({ value, onChange }) => {
  return (
    <SearchLabel>
      <LabelName>Finds contacts by name</LabelName>
      <InputSearchField
        type="text"
        name="filter"
        value={value}
        onChange={onChange}
      />
    </SearchLabel>
  );
};

ContactSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
