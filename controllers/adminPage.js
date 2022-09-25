module.exports = {
    index: async (req, res) => {
        const usersData = await fetch("http://localhost:3000/api/users");
        const data = await usersData.json();
        console.log(data);
        res.render("dashboard", {
            tittle: "Dashboard",
            css: "../public/stylesheets/dashboard.css",
            js: "../public/javascripts/dashboard.js",
            users: data,
        });
    },
};
