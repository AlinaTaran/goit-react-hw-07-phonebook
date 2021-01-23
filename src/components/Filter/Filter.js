import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { contactsSelectors, contactsActions } from 'redux/contact';

const Filter = () => {
  const value = useSelector(contactsSelectors.getFilter);
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getContacts);

  return (
    <>
      {contacts.length > 1 && (
        <label>
          Find contact by name
          <input
            type="text"
            name="name"
            value={value}
            onChange={event =>
              dispatch(contactsActions.changeFilter(event.target.value))
            }
          />
        </label>
      )}
    </>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Filter;
