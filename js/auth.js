/* document.addEventListener("DOMContentLoaded", () => {
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
} */


import { login } from './api.js';

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  try {
    const userData = await login(username, password);
    localStorage.setItem('usuarioLogueado', JSON.stringify(userData));
    window.location.href = 'admin-salones.html';
  } catch (error) {
    alert('Error al iniciar sesión: ' + error.message);
  }
});


