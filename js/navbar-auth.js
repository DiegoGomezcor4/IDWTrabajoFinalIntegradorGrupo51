document.addEventListener("DOMContentLoaded", () => {
  const token = sessionStorage.getItem("token");
  const userStr = localStorage.getItem("usuarioLogueado");
  const saludo = document.getElementById("saludoUsuario");
  const authBtn = document.getElementById("authBtn");

  if (token && userStr) {
    const user = JSON.parse(userStr);

    if (saludo) {
      saludo.textContent = `Hola, ${user.firstName || user.username || "Usuario"}`;
    }

    if (authBtn) {
      authBtn.textContent = "Logout";
      authBtn.classList.remove("btn-outline-primary");
      authBtn.classList.add("btn-outline-danger");
      authBtn.onclick = () => {
        sessionStorage.removeItem("token");
        localStorage.removeItem("usuarioLogueado");
        window.location.href = "index.html";  // Redirección a la página de inicio
      };
    }

    // Mostrar todos los enlaces de administración
    document.querySelectorAll(".admin-link").forEach(link => {
      link.classList.remove("d-none");
    });

  } else {
    if (authBtn) {
      authBtn.onclick = () => {
        window.location.href = "login.html";
      };
    }
  }
});
