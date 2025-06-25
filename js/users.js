import { getUsers } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const lista = document.getElementById('lista-usuarios');

  try {
    const data = await getUsers();
    const usuarios = data.users;

    usuarios.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.firstName} ${user.lastName} (${user.username}) - ${user.email}`;
      lista.appendChild(li);
    });

  } catch (error) {
    alert('Error al cargar usuarios: ' + error.message);
  }
});
