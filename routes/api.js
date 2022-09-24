const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const apiControllers = require("../controllers/apiControllers");

// ! CREATE
// * Create User
router.post("/user", jsonParser, apiControllers.createUser);

module.exports = router;
