import React, { useState, useEffect } from 'react'; 
import { nanoid } from 'nanoid'; 
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styles from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    try {
      const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
      setContacts(storedContacts);
    } catch (error) {
      console.error('Failed to load contacts from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } catch (error) {
      console.error('Failed to save contacts to localStorage:', error);
    }
  }, [contacts]);

  const handleAddContact = (name, number) => {
    const isDuplicate = contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
    
    if (isDuplicate) {
      alert(`Contact with name "${name}" already exists! Please use a different name.`);
      return;
    }

    setContacts(prevContacts => [...prevContacts, { id: nanoid(), name, number }]);
  };

  const handleDeleteContact = (id) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.App}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;
