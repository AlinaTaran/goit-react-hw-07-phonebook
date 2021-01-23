import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from 'redux/contact';
import s from './ContactForm.module.css';

function ContactForm() {
  const { register, handleSubmit, errors, reset, control } = useForm();

  const contacts = useSelector(contactsSelectors.getContacts);
  const dispatch = useDispatch();

  const isExistName = existName => {
    const nameNormalized = existName.toLowerCase();
    return contacts.find(({ name }) => name.toLowerCase() === nameNormalized);
  };

  const submitHandler = ({ name, number }) => {
    const sameName = isExistName(name);

    if (sameName) {
      alert(`${name} is already in your phonebook`);
    } else {
      dispatch(contactsOperations.addContact(name, number));
    }

    reset();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(submitHandler)}>
      <label className={s.label}>
        Name
        <input
          className={s.input}
          name="name"
          ref={register({
            minLength: { value: 2, message: 'Too short name' },
            maxLength: { value: 20, message: 'Too long name' },
            required: 'Is a required field',
          })}
          type="text"
        />
        {errors.name && <p className={s.errors}>{errors.name.message}</p>}
      </label>

      <label>
        Number
        <Controller
          as={InputMask}
          name="number"
          rules={{
            required: 'Phone number is required',
          }}
          defaultValue=""
          control={control}
          className={s.input}
          placeholder="+38 (___) ___-__-__"
          mask="+38 (999) 999-99-99"
        />
        {errors.number && <p className={s.errors}>{errors.number.message}</p>}
      </label>

      <button className={s.button} type="submit">
        Add to contact
      </button>
    </form>
  );
}

export default ContactForm;
