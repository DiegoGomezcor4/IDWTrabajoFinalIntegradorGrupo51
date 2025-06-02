document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault()

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const storedUser = {
        username: "admin",
        password: "1234"
    };

    if (username === storedUser.username && password === storedUser.password) {
        const usuarioLogueado = {
            username: storedUser.username,
            rol: "administrador"
        }
        // guarda la info de inicio de sesion
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogueado));
        window.location.href = "altaSalones.html"; // redirige al panel de administrador
    } else {
        document.getElementById("error").style.display = "block";
        
    }
}

);