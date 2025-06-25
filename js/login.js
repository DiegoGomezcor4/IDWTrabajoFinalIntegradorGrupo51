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

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (!loginForm) {
    console.error("No se encontró el formulario de login con ID 'loginForm'");
    return;
  }

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Credenciales inválidas");
      }

      const userData = await res.json();

      // ✅ Guardar token en sessionStorage
      sessionStorage.setItem("token", userData.token);

      // ✅ Guardar info del usuario (opcional)
      localStorage.setItem("usuarioLogueado", JSON.stringify(userData));

      // ✅ Redirigir al panel de administración
      window.location.href = "admin-salones.html";
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      const errorDiv = document.getElementById("error");
      if (errorDiv) {
        errorDiv.textContent = error.message;
        errorDiv.style.display = "block";
      } else {
        alert(error.message);
      }
    }
  });
});


