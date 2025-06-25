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


