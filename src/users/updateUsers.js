const User = require("./userModel");

async function updateUser(userId, newFields) {
  try {
    const result = await User.findOneAndUpdate(
      { _id: userId },
      { $set: newFields },
      { new: true }
    );
    return result;
  } catch (error) {
    console.log("error: ", error);
  }
}

module.exports = { updateUser };
