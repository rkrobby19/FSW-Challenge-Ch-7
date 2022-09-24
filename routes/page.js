const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const registerPage = require("../controllers/registerPage");
const loginPage = require("../controllers/loginPage");

router.get("/register", jsonParser, registerPage.index);

router.get("/login", loginPage.index);
router.post("/login", jsonParser, loginPage.login);

module.exports = router;
