const { Users } = require("../users");

const logoutUser = async (req, res) => {
  try {
    const body = req.body;
    const user = await Users.findOne({ email: body.email });

    if (user) {
      const passwordCompare = user.validatePassword(body.password);
      user.getJWT();
      const respondUserData = user.getPublicFields();
      passwordCompare
        ? res.status(200).json({ message: "Logout success" })
        : res.status(404).json({ message: "Email or password not correct" });
    } else {
      // якщо юзера немає перерендерити дану сторінку Авторизації з потрібними ерорами
      res.status(401).json({ message: "Not authorized" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = logoutUser;
