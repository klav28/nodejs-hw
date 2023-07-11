import contacts from "./contacts.js";
import { Command } from "commander";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      return console.log(await contacts.listContacts());
      break;

    case "get":
      return console.log(await contacts.getContactById(id));
      break;

    case "remove":
      return console.log(await contacts.removeContact(id));
      // ... id
      break;

    case "add":
      // ... name email phone
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction({ action: "remove", id: "rsKkOQUi80UsgVPCcLZZW" });
invokeAction({ action: "list" });
