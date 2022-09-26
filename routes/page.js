const express = require("express");
const app = express();
const passport = require("passport");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const authorization = require("../middleware/authorization");

app.use(bodyParser.urlencoded({ extended: true }));

const registerPage = require("../controllers/registerPage");
const loginPage = require("../controllers/loginPage");
const adminPage = require("../controllers/adminPage");
const playerPage = require("../controllers/playerPage");
const fightPage = require("../controllers/fightPage");

router.get("/register", jsonParser, registerPage.index);

router.get("/login", loginPage.index);
router.post("/login", jsonParser, loginPage.login);

router.get("/home", playerPage.index);

router.get("/fight/:server", fightPage.index);

router.get("/admin/dashboard", adminPage.index);

module.exports = router;
