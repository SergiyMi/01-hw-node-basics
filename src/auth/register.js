const { Users } = require("../users");
const loginUser = require("./login");

const registerUser = async (req, res) => {
  try {
    const body = req.body;
    if (body.password && body.email) {
      const user = await new Users(body);
      const result = await user.save();
      if (result) {
        // res.status(201).json({ user: result });
        loginUser(req, res);
      }
    } else {
      // якщо юзера немає перерендерити дану сторінку Реєстрації з потрібними ерорами
      res.status(422).json({ message: "Missing required fields" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = registerUser;
