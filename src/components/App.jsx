import { Component } from 'react';
import { nanoid } from 'nanoid';

import PhonebookForm from './Phonebook/PhonebookForm';
import Filter from './Phonebook/Filter';
import ContactsList from './Phonebook/ContactsList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts?.length) {
      // contacts && contacts.length
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  deleteName = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
  };

  addContact = ({ name, number }) => {
    if (this.isDublicate(name)) {
      alert(`${name} is already in contacts list`);
      return false;
    }

    this.setState(prevState => {
      const { contacts } = prevState;

      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return { contacts: [newContact, ...contacts] };
    });
    return true;
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  isDublicate(name) {
    const normalizedName = name.toLowerCase();
    const { contacts } = this.state;
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });

    return Boolean(result);
  }

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });

    return result;
  }

  render() {
    const { addContact, deleteName, handleFilter } = this;
    const contacts = this.getFilteredContacts();
    const isName = Boolean(contacts.length);

    return (
      <>
        <PhonebookForm onSubmit={addContact} />
        <Filter handleChange={handleFilter} />
        {isName && <ContactsList deleteName={deleteName} contacts={contacts} />}
        {/* {!isName && <p>No contacts in list</p>} */}
      </>
    );
  }
}

export default App;
