const { compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = {
    index: (req, res) => {
        res.render("login", {
            tittle: "Login",
            css: "./public/stylesheets/login.css",
            js: "./public/javascripts/login.js",
        });
    },
    login: async (req, res) => {
        let reqUserEmail = req.body.email;
        let reqUserPassword = req.body.password;

        // ! Find data on DB
        const userData = await User.findOne({
            where: {
                email: reqUserEmail,
            },
        });

        // * User not exist
        if (!userData) {
            return res.status(404).send({
                message: "User not found",
            });
        }
        // * Wrong user pass
        if (!compareSync(reqUserPassword, userData.password)) {
            return res.status(401).send({
                message: "Incorrect Password",
            });
        }

        console.log(userData);

        const payload = {
            username: userData.username,
            email: userData.email,
            role: userData.role,
        };

        const token = jwt.sign(payload, "Auth Key", {
            expiresIn: "1d",
        });

        res.send({
            message: "Login Success",
            token: `Bearer ${token}`,
            user: payload,
        });
    },
};
