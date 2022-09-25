module.exports = {
    index: (req, res) => {
        // const roomsData = await fetch("http://localhost:3000/api/rooms");
        // const data = await roomsData.json();
        // console.log(data);
        res.render("fight", {
            tittle: "Fight Room",
            css: "../public/stylesheets/fight.css",
            js: "../public/javascripts/fight.js",
            // rooms: data,
        });
    },
};
