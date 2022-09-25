const login = async () => {
    let userEmail = document.getElementById("email").value;
    let userPassword = document.getElementById("password").value;

    // let resp = await fetch("http://localhost:3000/login", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         email: userEmail,
    //         password: userPassword,
    //     }),
    // });

    // TODO: Change the admin redirect logic
    if (resp.status === 401) {
        alert("Check your email and password");
    } else {
        alert("You are authorized");
        window.location.href = "/admin/dashboard";
    }
};
