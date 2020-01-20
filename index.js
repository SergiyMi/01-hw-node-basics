const argv = require("yargs").argv;
const contacts = require("./contacts");

contacts.invokeAction(argv);
