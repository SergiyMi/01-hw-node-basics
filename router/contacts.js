const express = require("express");
const router = express.Router();
const contacts = require("../contacts");

router.get("/", (req, res) => {
  res.status(200).json(contacts.listContacts());
});

router.get("/:contactId", (req, res) => {
  const contactId = req.params.contactId;
  res.status(200).json(contacts.getContactById(contactId));
});

router.post("/", (req, res) => {
  const { name, email, phone } = req.body;
  if (name || email || phone) {
    res.status(400).json({ message: "missing required name field" });
  }
  const result = contacts.addContact(name, email, phone);
  res.status(201).json(result);
});

router.delete("/:contactId", (req, res) => {
  const contactId = req.params.contactId;
  res.status(200).json(contacts.removeContact(contactId));
});

router.patch("/:contactId", (req, res) => {
  const contactId = req.params.contactId;
  const { name, email, phone } = req.body;
  if (!req.body) {
    res.status(400).json({ message: "missing fields" });
  }
  res.status(200).json(contacts.updateContact(contactId, name, email, phone));
});

module.exports = router;
