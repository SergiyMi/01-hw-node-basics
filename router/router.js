const contacts = require("../contacts");
const router = require("express").Router();

const contactsRouter = require("./contacts");

router.use("/contacts", contactsRouter);

router.all("*", (req, res) => {
  res.status(404).json({ error: "On API Path not found" });
});
module.exports = router;
