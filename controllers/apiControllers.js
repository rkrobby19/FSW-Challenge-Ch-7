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
};
