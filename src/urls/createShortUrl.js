const Urls = require("./urlModel");
const shortid = require("shortid");
const notFound = require("../../middlewares/notFound");

const createShortUrl = (req, res) => {
  const { url } = req.body;

  Urls.findOne({ url })
    .then(matchUrl => {
      if (matchUrl) {
        res.redirect(`/?result=http://localhost:5000/${matchUrl.shortUrl}`);
      } else {
        const createNewShortUrl = new Urls({
          url,
          shortUrl: shortid.generate()
        });
        createNewShortUrl
          .save()
          .then(result => {
            res.redirect(`/?result=http://localhost:5000/${result.shortUrl}`);
          })
          .catch(err => notFound(err, res));
      }
    })
    .catch(err => notFound(err, res));
};

module.exports = createShortUrl;
