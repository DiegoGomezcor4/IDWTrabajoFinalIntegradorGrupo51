import { getUsers } from './api.js';

const lista = document.getElementById('lista-usuarios');

getUsers().then(users => {
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.firstName} ${user.lastName} (${user.username}) - ${user.email}`;
    lista.appendChild(li);
  });
}).catch(error => {
  alert('Error al cargar usuarios: ' + error.message);
});
