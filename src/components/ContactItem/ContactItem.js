import PropTypes from 'prop-types';

const ContactItem = ({ name, number, onClick }) => {
  return (
    <li>
      <p>
        {name}: {number}
      </p>
      <button onClick={onClick}>Delete</button>
    </li>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ContactItem;
