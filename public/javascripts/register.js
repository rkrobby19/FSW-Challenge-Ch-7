const register = async () => {
    let regUsername = document.getElementById("username").value;
    let regEmail = document.getElementById("email").value;
    let regRole = document.getElementById("role").value;
    let regPassword = document.getElementById("password").value;
    // console.log(regUsername);
    // console.log(regEmail);
    // console.log(regRole);
    // console.log(regPassword);

    let resp = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: regUsername,
            email: regEmail,
            role: regRole,
            password: regPassword,
        }),
    });
    // console.log(resp);
    if (resp.status == 201) {
        alert("You are registered");
        location.href = "/login";
    }
    // TODO: create relocate windows
};
