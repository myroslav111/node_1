const path = require('path');
const fs = require('fs').promises;

//  Раскомментируй и запиши значение
const contactsPath = path.resolve('db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const contact = contacts.find(el => el.id === contactId);
    if (!contact) return null;
    return contact;

    // const contact = contacts.find(({ id }) => id === contactId);
    // if (!contact) return null;
    // return contact;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const indexOfContact = contacts.findIndex(el => el.id === contactId);
    if (indexOfContact === -1) return null;
    const updatedContacts = JSON.stringify(
      contacts.filter(el => el.id !== contactId)
    );

    await fs.writeFile(contactsPath, updatedContacts, 'utf8');

    return contacts[indexOfContact];
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: (Math.random() * 10).toString(),
      name,
      email,
      phone,
    };
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);

    const updatedContacts = JSON.stringify([...contacts, newContact]);
    await fs.writeFile(contactsPath, updatedContacts, 'utf8');
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
