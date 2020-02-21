const mongoose = require("mongoose");
const { mongodbUri } = require("../config/config");

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  connectTimeoutMS: 5000,
  serverSelectionTimeoutMS: 5000
};

async function dbConnection() {
  try {
    await mongoose.connect(mongodbUri, option);
  } catch (err) {
    console.log("err: ", err);
    process.exit(1);
  }
  console.log("Database connection successful");
}

module.exports = dbConnection;
