const express = require("express");
const router = express.Router();

const login = require("./login");
const register = require("./register");
const logout = require("./logout");

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

module.exports = router;
