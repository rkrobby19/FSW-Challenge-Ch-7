const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const apiControllers = require("../controllers/apiControllers");

// ! CREATE
// * Create User
router.post("/user", jsonParser, apiControllers.createUser);
router.post("/create-room", jsonParser, apiControllers.createRoom);
router.post(
    "/player-choices/:serverid",
    jsonParser,
    apiControllers.createPlayerChoice
);

// ! READ
// * Get All Users
router.get("/users", apiControllers.getAllUsers);

// * Read All Rooms Server
router.get("/rooms", apiControllers.getAllRooms);
router.get("/rooms/:server", apiControllers.getRoomByServer);

// * Read PlayerChoices
router.get("/player-choices/:serverid", apiControllers.getAllPlayerChoices);

// ! UPDATE
// * Player in Room
router.put("/rooms/:server", jsonParser, apiControllers.updateRoomPlayer);
// * PlayerChoices
router.put(
    "/player-choices/:roomid",
    jsonParser,
    apiControllers.updatePlayerChoices
);

module.exports = router;
