module.exports = {
    index: async (req, res) => {
        const roomsData = await fetch(
            `http://localhost:3000/api/rooms/${req.params.server}`
        );
        const room = await roomsData.json();
        console.log(room);
        res.render("fight", {
            tittle: "Fight Room",
            css: "../public/stylesheets/fight.css",
            js: "../public/javascripts/fight.js",
            room: room,
        });
    },
};
