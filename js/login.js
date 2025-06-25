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
      console.log("Datos del usuario recibidos:", userData);

      // 🔍 Revisar si hay token o ssToken
      const token = userData.token || userData.accessToken;

      if (!token) {
        console.log("Estructura completa de userData:", userData);
      throw new Error("No se recibió token del servidor.");
}

      // Guardar en sessionStorage
      sessionStorage.setItem("token", token);

      // Guardar usuario completo en localStorage
      localStorage.setItem("usuarioLogueado", JSON.stringify(userData));

      // Redirigir
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
