document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
  if (!usuario) {
    alert("Debes iniciar sesión para acceder a esta página.");
    window.location.href = "login.html";
  }
});
