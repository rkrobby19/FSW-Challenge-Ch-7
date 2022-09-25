const submit = async (server, username) => {
    let reqSide = document.getElementById("playerSide").value;
    console.log(reqSide);
    let reqRound1 = document.getElementById("round1").value;
    console.log(reqRound1);
    let reqRound2 = document.getElementById("round2").value;
    console.log(reqRound2);
    let reqRound3 = document.getElementById("round3").value;
    console.log(reqRound3);
    let resp = await fetch(
        `http://localhost:3000/api//player-choices/${server}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                playerSide: reqSide,
                round1: reqRound1,
                round2: reqRound2,
                round3: reqRound3,
            }),
        }
    );

    // console.log(resp);
    if (resp.status == 202) {
        alert(`Thanks for your Choices`);
    }
};
