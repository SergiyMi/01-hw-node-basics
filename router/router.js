const router = require("express").Router();

const { urlRouter } = require("../src/urls");
const { authRouter } = require("../src/auth");
const { userRouter } = require("../src/users");
const contactsRouter = require("./contacts");

router.use("/url", urlRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);

router.use("/contacts", contactsRouter);

router.all("*", (req, res) => {
  res.status(404).json({ error: "On API Path not found" });
});

module.exports = router;
