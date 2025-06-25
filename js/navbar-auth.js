document.addEventListener("DOMContentLoaded", () => {
  const token = sessionStorage.getItem("token");
  const userStr = localStorage.getItem("usuarioLogueado");
  const saludo = document.getElementById("saludoUsuario");
  const authBtn = document.getElementById("authBtn");
  const adminLink = document.getElementById("adminLink");

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

    if (adminLink) {
      adminLink.classList.remove("d-none");
    }
  } else {
    if (authBtn) {
      authBtn.onclick = () => {
        window.location.href = "login.html";
      };
    }
  }
});
