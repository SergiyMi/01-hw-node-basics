const express = require("express");
const router = express.Router();
const contacts = require("../contacts");

router.get("/", (req, res) => {
  contacts
    .listContacts()
    .then(user => res.status(200).json({ contacts: user }))
    .catch(error => res.status(400).json({ error: error }));
});

router.get("/:contactId", (req, res) => {
  const contactId = req.params.contactId;
  contacts
    .getContactById(contactId)
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json({
            user: user,
            message: `contact with id: ${contactId} not found`
          });
      }
      res.status(200).json({ user: user });
    })
    .catch(error => res.status(400).json({ error: error }));
});

router.post("/", (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json({ message: "missing required name field" });
  }

  contacts
    .addContact(name, email, phone)
    .then(user => res.status(201).json({ user: user }))
    .catch(error => res.status(400).json({ error: error }));
});

router.delete("/:contactId", (req, res) => {
  const contactId = req.params.contactId;
  contacts
    .removeContact(contactId)
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json({ user: user, message: "contact not found" });
      }
      res
        .status(200)
        .json({ user: user, message: `contact with id: ${contactId} deleted` });
    })
    .catch(error => res.status(400).json({ error: error }));
});

router.patch("/:contactId", (req, res) => {
  const contactId = req.params.contactId;
  const newFields = req.body;
  if (!req.body) {
    return res.status(400).json({ message: "missing fields" });
  }
  contacts
    .updateContact(contactId, newFields)
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json({ user: user, message: "contact not found" });
      }
      res.status(200).json({ user: user });
    })
    .catch(error => res.status(400).json({ error: error }));
});

module.exports = router;
