module.exports = {
    superUser: (req, res, next) => {
        console.log(req.user);
        if (req.user.role === "SuperUser") {
            next();
        } else {
            res.status(401).send(
                "You dont have permission to access this page"
            );
        }
    },

    player: (req, res, next) => {
        if (req.user.role === "Player") {
            next();
        } else {
            res.status(401).send(
                "You dont have permission to access this page"
            );
        }
    },
};
