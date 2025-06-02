document.addEventListener("DOMContentLoaded", () => {
  const authBtn = document.getElementById("authBtn");
  const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));

  if (!authBtn) return; // Si no hay botón, no hace nada (seguridad)

  if (usuario) {
    authBtn.textContent = "Cerrar sesión";
    authBtn.classList.replace("btn-outline-primary", "btn-outline-danger");
    authBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogueado");
      window.location.href = "index.html";
    });
  } else {
    authBtn.textContent = "Login";
    authBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }
});


// saludo
const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
const saludo = document.getElementById("saludoUsuario");

if (usuario && saludo) {
  saludo.textContent = `Hola, ${usuario.username}`;
}
