module.exports = {
    index: (req, res) => {
        res.render("register", {
            tittle: "Register",
            css: "./public/stylesheets/register.css",
            js: "./public/javascripts/register.js",
        });
    },
};
