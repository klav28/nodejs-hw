import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

const updateStorage = (data) =>
  fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

export const listContacts = async () => {
  // Повертає масив контактів.
  const data = JSON.parse(await fs.readFile(contactsPath));
  return data;
};

export const getContactById = async (contactId) => {
  // Повертає об'єкт контакту з таким id або null, якщо контакт з таким id не знайдений.
  const data = await listContacts();
  const result = data.find((el) => el.id === contactId);
  return result || null;
};

export const removeContact = async (contactId) => {
  // Видаляє контакт та повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const data = await listContacts();
  const index = data.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await updateStorage(data);
  return result;
};

export const addContact = async ({ name, email, phone }) => {
  // Додає контакт та повертає об'єкт доданого контакту.
  const data = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  data.push(newContact);
  await updateStorage(data);
  return newContact;
};

export const updateContact = async (id, { name, email, phone }) => {
  // Оновлює контакт та повертає об'єкт оновленого контакту або null, якщо контакт не знайдено.
  const data = await listContacts();
  const index = data.findIndex((el) => el.id === id);
  if (index === -1) {
    return null;
  }
  data[index] = { id, name, email, phone };
  await updateStorage(data);
  return data[index];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
