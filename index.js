// const argv = require('yargs').argv;
const { Command } = require('commander');
const modContacts = require('./contacts');

// modContacts.listContacts().then(console.log);

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const listContacts = await modContacts.listContacts();
      console.table(listContacts);
      break;

    case 'get':
      const contactById = await modContacts.getContactById(id);
      console.log(contactById);
      break;

    case 'add':
      await modContacts.addContact(name, email, phone);
      console.table(await modContacts.listContacts());
      break;

    case 'remove':
      const removeContact = await modContacts.removeContact(id);
      if (!removeContact) {
        return new Error(`There is no contact with this ${id} ID`);
      }
      console.table(await modContacts.listContacts());
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
