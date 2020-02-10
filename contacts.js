const fs = require("fs");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
      throw err;
    }
    data.length < 1
      ? console.log("This file is empty")
      : console.table(JSON.parse(data));
    return JSON.parse(data);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
      return console.error(err);
    }
    let parser = null;
    data.length < 1
      ? console.log("This file is empty")
      : ((parser = JSON.parse(data).find(
          contact => String(contact.id) === contactId
        )),
        console.log(parser));
    if (!parser) {
      return console.log({ Status: 404, message: "Not found" });
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, { encoding: "utf-8" }, (err, data) => {
    if (err) throw err;
    if (data.length < 1) {
      console.log("File is empty");
      return;
    }
    const parser = JSON.parse(data).find(
      contact => String(contact.id) === contactId
    );
    if (!parser) {
      console.log("Contact with this id not found");
      return;
    }

    const newData = JSON.parse(data).filter(
      contact => String(contact.id) !== contactId
    );

    fs.writeFile(contactsPath, JSON.stringify(newData, null, "  "), function(
      err
    ) {
      if (err) throw err;
      console.log(`contact with id: ${contactId} deleted`);
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
      return console.error(err);
    }
    const id = shortid.generate();
    const space = "  ";
    if (data.length < 1) data = "[]";
    let parser = JSON.parse(data);

    const newData = {
      id: `${id}`,
      name,
      email,
      phone
    };
    parser = [...parser, newData];

    fs.writeFile(contactsPath, JSON.stringify(parser, null, "  "), function(
      err
    ) {
      if (err) throw err;
      console.log("replace");
    });
  });
}

function updateContact(contactId, name, email, phone) {
  fs.readFile(contactsPath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
      return console.error(err);
    }

    if (data.length < 1) data = "[]";
    let parser = JSON.parse(data);

    const par = parser.map(contact => {
      if (String(contact.id) === contactId) {
        contact.name = name;
        contact.email = email;
        contact.phone = phone;
      }
      return contact;
    });

    fs.writeFile(contactsPath, JSON.stringify(par, null, "  "), function(err) {
      if (err) throw err;
      console.log("update");
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
};
