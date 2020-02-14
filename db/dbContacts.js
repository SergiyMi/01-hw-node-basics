const mongoose = require("mongoose");

async function dbConnection() {
  try {
    await mongoose.connect(
      "mongodb+srv://FirstUser:First-2020@cluster0-wkkpz.mongodb.net/db-contacts?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 5000,
        serverSelectionTimeoutMS: 5000
      }
    );
  } catch (err) {
    console.log("err: ", err);
    process.exit(1);
  }
  console.log("Database connection successful");
}

module.exports = dbConnection;
