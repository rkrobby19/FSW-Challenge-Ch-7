const bcrypt = require("bcrypt");

const { User, Room, PlayerChoice } = require("../models");

module.exports = {
    // ! CREATE
    createUser: async (req, res) => {
        try {
            const saltRounds = 10;
            let hashPassword = bcrypt.hashSync(req.body.password, saltRounds);

            let dataUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                role: req.body.role,
                password: hashPassword,
            });
            res.status(201).send({
                msg: `User succesfully created`,
                user: dataUser,
            });
        } catch (error) {
            console.log(error);
            res.status(422).send(`Cant register user`);
        }
    },

    createRoom: async (req, res) => {
        try {
            let roomServer = await Room.create({
                UserId: req.body.UserId,
                server: req.body.server,
            });

            let rounds = [1, 2, 3];
            let firstRound = await PlayerChoice.create({
                RoomId: roomServer.id,
                round: rounds[0],
            });
            let secondRound = await PlayerChoice.create({
                RoomId: roomServer.id,
                round: rounds[1],
            });
            let thirdRound = await PlayerChoice.create({
                RoomId: roomServer.id,
                round: rounds[2],
            });

            res.status(201).send({
                msg: `Room succesfully created`,
                room: roomServer,
                plyerChoice: [firstRound, secondRound, thirdRound],
            });
        } catch (error) {
            console.log(error);
            res.status(422).send(`Cant create room`);
        }
    },

    createPlayerChoice: async (req, res) => {
        try {
            let rounds = [1, 2, 3];
            let firstRound = await PlayerChoice.create({
                RoomId: req.params.serverId,
                round: rounds[0],
            });
            let secondRound = await PlayerChoice.create({
                RoomId: req.params.serverId,
                round: rounds[1],
            });
            let thirdRound = await PlayerChoice.create({
                RoomId: req.params.serverId,
                round: rounds[2],
            });

            res.status(201).send({
                msg: `Player choices row succesfully created`,
                round: [firstRound, secondRound, thirdRound],
            });
        } catch (error) {
            console.log(error);
            res.status(422).send(`Cant create room`);
        }
    },

    // ! READ
    getAllUsers: async (req, res) => {
        let users = await User.findAll();
        res.send({
            data: users,
        });
    },

    getAllRooms: async (req, res) => {
        let rooms = await Room.findAll();
        res.send({
            data: rooms,
        });
    },

    getRoomByServer: async (req, res) => {
        try {
            let room = await Room.findOne({
                where: { server: req.params.server },
            });
            res.send({
                data: room,
            });
        } catch (error) {
            res.status(404).send(`Data not found`);
        }
    },

    getAllPlayerChoices: async (req, res) => {
        let playerChoices = await PlayerChoice.findAll({
            where: {
                RoomId: req.params.serverid,
            },
        });
        res.send({
            data: playerChoices,
        });
    },

    // ! UPDATE
    updateRoomPlayer: async (req, res) => {
        try {
            let data = await Room.findOne({
                where: { server: req.params.server },
            });
            // console.log(data);
            data.player1 = req.body.username;
            await data.save();
            res.status(202).send(data);
        } catch (error) {
            console.log(error);
            res.send(`cant register user`);
        }
    },

    updatePlayerChoices: async (req, res) => {
        try {
            console.log(req.user);

            let round1 = await PlayerChoice.findOne({
                where: { RoomId: req.params.roomid, round: 1 },
            });

            let round2 = await PlayerChoice.findOne({
                where: { RoomId: req.params.roomid, round: 2 },
            });

            let round3 = await PlayerChoice.findOne({
                where: { RoomId: req.params.roomid, round: 3 },
            });

            let room = await Room.findOne({
                where: {
                    id: req.params.roomid,
                },
            });

            console.log(room);

            if (req.body.playerSide == "Player 1") {
                room.player1 = req.user.username;
                round1.player1 = req.body.round1;
                round2.player1 = req.body.round2;
                round3.player1 = req.body.round3;
            } else {
                room.player2 = req.user.username;
                round1.player2 = req.body.round1;
                round2.player2 = req.body.round2;
                round3.player2 = req.body.round3;
            }

            await room.save();
            await round1.save();
            await round2.save();
            await round3.save();

            res.status(202).send({
                msg: `Data Updated`,
                room: room,
                playerChoices: [round1, round2, round3],
            });
        } catch (error) {
            console.log(error);
            res.send(`cant update data`);
        }
    },
};
