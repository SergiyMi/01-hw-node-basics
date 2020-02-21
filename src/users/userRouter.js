const router = require("express").Router();
const getUser = require("./getUser");
const users = require("./updateUsers");
const checkToken = require("../../middlewares/checkToken");

router.get("/", checkToken, getUser);
router.patch("/:userId", checkToken, (req, res) => {
  const userId = req.params.userId;
  const newFields = req.body;
  if (!req.body) {
    return res.status(400).json({ message: "missing fields" });
  }
  users
    .updateUser(userId, newFields)
    .then(user => {
      if (!user) {
        return res.status(404).json({ user: user, message: "user not found" });
      }
      res.status(200).json({ user: user });
    })
    .catch(error => res.status(400).json({ error: error }));
});

module.exports = router;
