/* document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
  if (!usuario) {
    alert("Debes iniciar sesión para acceder a esta página.");
    window.location.href = "login.html";
  }
});
 */

document.addEventListener("DOMContentLoaded", () => {
  const usuarioStr = localStorage.getItem("usuarioLogueado");
  if (!usuarioStr) {
    alert("Debes iniciar sesión para acceder a esta página.");
    window.location.href = "login.html";
    return;
  }

  const usuario = JSON.parse(usuarioStr);

  // Mostrar saludo con nombre o username
  const saludo = document.getElementById("saludoUsuario");
  if (saludo) {
    saludo.textContent = `Hola, ${usuario.firstName || usuario.username || 'Usuario'}`;
  }

  // Cambiar botón Login a Logout
  const authBtn = document.getElementById("authBtn");
  if (authBtn) {
    authBtn.textContent = "Logout";
    authBtn.classList.remove("btn-outline-primary");
    authBtn.classList.add("btn-outline-danger");

    authBtn.onclick = () => {
      localStorage.removeItem("usuarioLogueado");
      window.location.href = "login.html";
    };
  }
});
