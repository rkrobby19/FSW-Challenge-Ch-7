const validateLogin = () => {
    const data = localStorage.getItem("token-login");
    if (data === null) {
        location.href = "/login";
    }
};

validateLogin();

const submit = async (server, id) => {
    let reqSide = document.getElementById("playerSide").value;
    console.log(reqSide);
    let reqRound1 = document.getElementById("round1").value;
    console.log(reqRound1);
    let reqRound2 = document.getElementById("round2").value;
    console.log(reqRound2);
    let reqRound3 = document.getElementById("round3").value;
    console.log(reqRound3);
    let resp = await fetch(
        `http://localhost:3000/api/player-choices/${server}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token-login"),
            },
            body: JSON.stringify({
                playerSide: reqSide,
                round1: reqRound1,
                round2: reqRound2,
                round3: reqRound3,
            }),
        }
    );

    let result = await fetch(
        `http://localhost:3000/api/player-choices/${id}/get-result`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token-login"),
            },
        }
    );
    console.log(server);
    console.log(resp.status);
    if (resp.status === 200) {
        alert(`Thanks for your Choices`);
        window.location.href = "/home";
    }
};
