import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from 'redux/contact';
import s from './ContactForm.module.css';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(contactsSelectors.getContacts);
  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const isExistName = existName => {
    const nameNormalized = existName.toLowerCase();
    return contacts.find(({ name }) => name.toLowerCase() === nameNormalized);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const sameName = isExistName(name);
    const contact = { name, number };

    if (sameName) {
      alert(`${name} is already in your phonebook`);
    } else {
      dispatch(contactsOperations.addContact(contact));
    }

    if (contact === '') {
      return alert('Enter contact');
    }

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label}>
        Name
        <input
          className={s.input}
          name="name"
          value={name}
          type="text"
          onChange={handleChange}
        />
      </label>

      <label>
        Number
        <input
          className={s.input}
          name="number"
          type="tel"
          value={number}
          onChange={handleChange}
        />
      </label>

      <button className={s.button} type="submit">
        Add to contact
      </button>
    </form>
  );
}

export default ContactForm;
