const Urls = require("./urlModel");
const notFound = require("../../middlewares/notFound");

const getUrlById = (req, res, next) => {
  const shortUrl = req.params.shortUrlId;
  if (
    shortUrl === "sign-in" ||
    shortUrl === "sign-up" ||
    shortUrl === "logout" ||
    shortUrl === "dashboard"
  ) {
    return next();
  }
  Urls.findOne({ shortUrl })
    .then(result => {
      res.redirect(301, result.url);
    })
    .catch(err => notFound(err, res));
};

module.exports = getUrlById;
