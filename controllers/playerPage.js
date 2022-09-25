module.exports = {
    index: async (req, res) => {
        const roomsData = await fetch("http://localhost:3000/api/rooms");
        const data = await roomsData.json();
        console.log(data);
        res.render("home", {
            tittle: "",
            css: "../public/stylesheets/home.css",
            js: "../public/javascripts/home.js",
            rooms: data,
        });
    },
};
