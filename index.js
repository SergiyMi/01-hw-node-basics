const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();

const router = require("./router/router");
const errorsHandler = require("./middlewares/errors");
const notFound = require("./middlewares/notFound");
const dbConnection = require("./db/dbContacts");
const config = require("./config/config");
const getUrl = require("./src/urls/getUrlById");

if (config.mode === "development") {
  app.use(logger("dev"));
}

dbConnection();

const { aggregation, getUsersBySubscription } = require("./aggregation");

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const optionsReactViews = { beautify: true };
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine(
  "jsx",
  require("express-react-views").createEngine(optionsReactViews)
);

app.get("/aggregation", aggregation);
app.get("/users", getUsersBySubscription);

// Шукати в БД існуючий шорт ід і по результату зробити редірект на той урл який знайдений
app.get("/:shortUrlId", getUrl);

// Віддати (зрендерити)  index.html  з формою для написання користувачем його урл з якого потрібно буде
// створити шорт урл і результам від отримає на цій же сторінці
// якщо у квері немає ніяких даних просто не промальовуємо відповідий ДОМ елемент
app.get("/", (req, res) => {
  const query = req.query;
  res.render("index", query);
});

// For autorisation
app.get("/sign-in", (req, res) => {
  res.render("signIn");
});

// For registration
app.use("/sign-up", (req, res) => {
  res.render("register");
});

// Privat cabinet
app.use("/dashboard", (req, res) => {
  res.render("index");
});

// API для роботи з урлами і користувачами
app.use("/api", router);

app.use("*", notFound);

app.use(errorsHandler);

app.listen(config.port, () => {
  console.log(`Server running in ${config.port} port`);
});
