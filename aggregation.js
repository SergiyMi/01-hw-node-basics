const User = require("./src/users/userModel");

const getUsersBySubscription = async (req, res) => {
  const { subscription } = req.query;
  console.log(subscription);
  try {
    const users = await User.find({ subscription: subscription });
    res.status(200).json({ result: users });
  } catch (error) {
    error.message;
  }
};

const aggregation = (req, res) => {
  res.send("resres");
};

module.exports = { aggregation, getUsersBySubscription };
