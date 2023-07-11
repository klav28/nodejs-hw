import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const updateStorage = (data) =>
  fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

export const listContacts = async () => {
  const data = JSON.parse(await fs.readFile(contactsPath));
  return data;
  // ...твій код. Повертає масив контактів.
};

export const getContactById = async (contactId) => {
  const data = await listContacts();
  const result = data.find((el) => el.id === contactId);
  return result || null;
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
};

export const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await updateStorage(data);
  return result;
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
};

export const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  data.push(newContact);
  await updateStorage(data);
  return newContact;
  // ...твій код. Повертає об'єкт доданого контакту.
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
