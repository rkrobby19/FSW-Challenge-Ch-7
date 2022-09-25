const login = async () => {
    let userEmail = document.getElementById("email").value;
    let userPassword = document.getElementById("password").value;

    let resp = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword,
        }),
    });

    if (resp.status === 401) {
        alert("Check your email and password");
    } else {
        alert("You are authorized");
        const data = await resp.json();

        localStorage.setItem("token-login", data.token);

        if (data.user.role === "SuperUser") {
            location.href = "/admin/dashboard";
        } else {
            location.href = "/home";
        }
    }
};
