const router = require("express").Router();
const createShortUrl = require("./createShortUrl");

router.post("/", createShortUrl);

module.exports = router;
