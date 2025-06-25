/* document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
  if (!usuario) {
    alert("Debes iniciar sesión para acceder a esta página.");
    window.location.href = "login.html";
  }
});
 */

document.addEventListener("DOMContentLoaded", () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    alert("Debes iniciar sesión para acceder a esta página.");
    window.location.href = "login.html";
    return;
  }

  // Mostrar saludo si está disponible
  const userStr = localStorage.getItem("usuarioLogueado");
  if (userStr) {
    const user = JSON.parse(userStr);
    const saludo = document.getElementById("saludoUsuario");
    if (saludo) {
      saludo.textContent = `Hola, ${user.firstName || user.username || 'Usuario'}`;
    }
  }

  // Cambiar el botón a Logout
  const authBtn = document.getElementById("authBtn");
  if (authBtn) {
    authBtn.textContent = "Logout";
    authBtn.classList.remove("btn-outline-primary");
    authBtn.classList.add("btn-outline-danger");

    authBtn.addEventListener("click", () => {
      sessionStorage.removeItem("token");
      localStorage.removeItem("usuarioLogueado");
      window.location.href = "login.html";
    });
  }
});
