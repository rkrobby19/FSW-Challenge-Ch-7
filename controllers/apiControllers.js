const bcrypt = require("bcrypt");

const { User } = require("../models");

module.exports = {
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
};
