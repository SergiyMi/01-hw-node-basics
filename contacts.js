const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;
  }
}

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
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
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      return console.error(err);
    }
    let parser = null;
    data.length < 1
      ? console.log("This file is empty")
      : ((parser = JSON.parse(data).find(contact => contact.id === contactId)),
        console.log(parser));
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    if (data.length < 1) {
      console.log("File is empty");
      return;
    }
    const parser = JSON.parse(data).find(contact => contact.id === contactId);
    if (!parser) {
      console.log("Contact with this id not found");
      return;
    }

    const firstIndex = data.indexOf(`"id": ${contactId}`) - 6;
    const secondSubstr = data.substring(firstIndex, data.length);
    const secondIndex = secondSubstr.indexOf("}");
    const firstSubstring = data.substring(0, firstIndex);
    const secondSubstring = data.substring(firstIndex + secondIndex + 5);
    let resultString = firstSubstring + secondSubstring;
    if (!resultString.includes("]")) {
      console.log("This is last contact");
      resultString = resultString.substring(0, resultString.length - 4) + "\n]";
    }
    console.log(resultString);

    fs.writeFile(contactsPath, resultString, function(err) {
      if (err) throw err;
      console.log(`contact with id: ${contactId} deleted`);
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      return console.error(err);
    }
    let id = null;
    const space = "  ";
    data.length < 1 ? (id = 1) : (id = JSON.parse(data).length + 1);
    const newData = `\n${space}{ \n  ${space}"id": ${id}, \n  ${space}"name": "${name}", \n  ${space}"email": "${email}", \n  ${space}"phone": "${phone}" \n${space}}`;

    data.length < 1
      ? (str = "[" + String(newData) + "\n]")
      : ((str = data.substring(0, data.length - 3)),
        (str =
          str +
          "," +
          String(newData) +
          data.substring(data.length - 3, data.length)));
    console.log(str);

    fs.writeFile(contactsPath, str, function(err) {
      if (err) throw err;
      console.log("replace");
    });
  });
}

module.exports = { invokeAction };
