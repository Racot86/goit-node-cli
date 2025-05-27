import { program } from "commander";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {

    case "list":
      const contacts = await listContacts();
      if (contacts){
        console.log("----------------------------------------");
        console.log("               Contacts");
        console.log("----------------------------------------");
        let no = 0
        contacts.forEach(contact => {
          no++
          console.log(` ${no}. (${contact.id}):`)
          console.log("  name: ", contact.name)
          console.log("  e-mail: ", contact.email)
          console.log("  phone: ", contact.phone, "\n")
        });
        console.log("----------------------------------------");
      } else {
        console.log("No contacts found");
        return;
      }
      break

    case "get":
      const contact = await getContactById(id);
      if (contact){
        console.log("----------------------------------------");
        console.log(`             Contact info`);
        console.log("----------------------------------------");
        console.log(` name: ${contact.name}`);
        console.log(` e-mail: ${contact.email}`);
        console.log(` phone: ${contact.phone}`);
        console.log("----------------------------------------");
      }else {
        console.log("Contact not found");
        return;
      }
      break

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(`Contact ${newContact.name} added successfully! ID: ${newContact.id}`);
      break

    case "remove":
      const removedContact = await removeContact(id);
      if (removedContact) {
        console.log(`Contact ${removedContact.name}(${removedContact.id}) removed successfully!`);
      }else {
        console.log("Contact not found");
      }
      break

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options)
