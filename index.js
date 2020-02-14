const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();

const router = require("./router/router");
const errorsHandler = require("./middlewares/errors");
const notFound = require("./middlewares/notFound");
const dbConnection = require("./db/dbContacts");

const port = process.env.PORT || 5000;

const isDev = process.env.NODE_ENV === "development";
if (isDev) {
  app.use(logger("dev"));
}

dbConnection();

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use("*", notFound);

app.use(errorsHandler);

app.listen(port, () => {
  console.log(`Server running in ${port} port`);
});
