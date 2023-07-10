import contacts from "./contacts.js";

const listContacts = async () => {
  const result = await contacts.listContacts();
  return result;
};

console.log(listContacts);
