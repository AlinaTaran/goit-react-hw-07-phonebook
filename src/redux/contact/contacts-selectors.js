export const getContacts = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;

export const filteredContacts = state => {
  const contacts = getContacts(state);
  const filter = getFilter(state);
  const normalizedContact = filter.toLowerCase();

  return contacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedContact),
  );
};
