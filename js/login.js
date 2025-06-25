/* document.getElementById("loginForm").addEventListener("submit", function (e) {
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
        window.location.href = "admin-salones.html"; // redirige al panel de administrador
    } else {
        document.getElementById("error").style.display = "block";
        
    }
}

); */

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      throw new Error("Credenciales inválidas");
    }

    const userData = await res.json(); // contiene el usuario y token

    // Guardar en localStorage
    localStorage.setItem("usuarioLogueado", JSON.stringify(userData));

    // Redirigir
    window.location.href = "admin-salones.html";

  } catch (error) {
    const errorMsg = document.getElementById("error");
    if (errorMsg) {
      errorMsg.textContent = error.message;
      errorMsg.style.display = "block";
    } else {
      alert(error.message);
    }
  }
});
