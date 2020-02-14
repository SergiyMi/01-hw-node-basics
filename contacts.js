const fs = require("fs");
const path = require("path");
const shortid = require("shortid");
const Contact = require("./model/contact");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.log("error: ", error);
  }
}

async function getContactById(contactId) {
  try {
    const result = Contact.findById(contactId);
    return result;
  } catch (error) {
    console.log("error: ", error);
  }
}

async function removeContact(contactId) {
  try {
    const result = Contact.findOneAndDelete({ _id: contactId });
    return result;
  } catch (error) {
    console.log("error: ", error);
  }
}

async function addContact(name, email, phone) {
  const id = shortid.generate();
  const newData = {
    id: `${id}`,
    name,
    email,
    phone
  };
  const newContact = new Contact(newData);
  const result = await newContact.save();
  return result;
}

async function updateContact(contactId, newFields) {
  try {
    const result = await Contact.findOneAndUpdate(
      { _id: contactId },
      { $set: newFields },
      { new: true }
    );
    return result;
  } catch (error) {
    console.log("error: ", error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
};
