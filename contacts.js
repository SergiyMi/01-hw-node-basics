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
      : ((parser = JSON.parse(data).find(contact => contact.id === contactId)),
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
    const space = "  ";
    const parser = JSON.parse(data).find(contact => contact.id === contactId);
    if (!parser) {
      console.log("Contact with this id not found");
      return;
    }

    const newData = JSON.parse(data).filter(
      contact => contact.id !== contactId
    );
    let par = newData.map(
      pa =>
        (pa = `\n${space}{ \n  ${space}"id": "${pa.id}", \n  ${space}"name": "${pa.name}", \n  ${space}"email": "${pa.email}", \n  ${space}"phone": "${pa.phone}" \n${space}}`)
    );
    str1 = "[";
    str2 = "\n]\n";
    str = str1 + par + str2;

    fs.writeFile(contactsPath, str, function(err) {
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
    let par = parser.map(
      pa =>
        (pa = `\n${space}{ \n  ${space}"id": "${pa.id}", \n  ${space}"name": "${pa.name}", \n  ${space}"email": "${pa.email}", \n  ${space}"phone": "${pa.phone}" \n${space}}`)
    );
    str1 = "[";
    str2 = "\n]\n";
    str = str1 + par + str2;

    fs.writeFile(contactsPath, str, function(err) {
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

    const space = "  ";
    if (data.length < 1) data = "[]";
    let parser = JSON.parse(data);

    let par = parser.map(pa => {
      let temp = pa.id;
      if (typeof temp === "number") temp = JSON.stringify(temp);
      if (temp === contactId) {
        pa = `\n${space}{ \n  ${space}"id": "${pa.id}", \n  ${space}"name": "${name}", \n  ${space}"email": "${email}", \n  ${space}"phone": "${phone}" \n${space}}`;
        return JSON.parse(pa);
      }
      return pa;
    });

    par = par.map(pa => {
      pa = `\n${space}{ \n  ${space}"id": "${pa.id}", \n  ${space}"name": "${pa.name}", \n  ${space}"email": "${pa.email}", \n  ${space}"phone": "${pa.phone}" \n${space}}`;
      return pa;
    });

    str1 = "[";
    str2 = "\n]\n";
    str = str1 + par + str2;

    fs.writeFile(contactsPath, str, function(err) {
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
