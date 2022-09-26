const validateLogin = () => {
    const data = localStorage.getItem("token-login");
    if (data === null) {
        location.href = "/login";
    }
};

validateLogin();

const createNewRoom = async () => {
    let regServer = document.getElementById("inputServer").value;

    const resp = await fetch(`http://localhost:3000/api/create-room`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            server: regServer,
        }),
    });
    if (resp.status === 201) {
        alert("Create Room Server Success");
        document.getElementById("inputServer").value = null;
    } else {
        alert("Inser data failed");
    }
    location.reload();
};

const selectHandler = async (id) => {
    let ans = confirm("Join this room server?");
    if (ans) {
        location.href = `/fight/${id}`;
    }
};
