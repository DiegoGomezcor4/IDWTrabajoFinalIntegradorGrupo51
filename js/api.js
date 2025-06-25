// api.js

// Función para loguearse
export async function login(username, password) {
  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error('Credenciales inválidas');
  }

  return await res.json(); // devuelve token, usuario, etc.
}

// Función para obtener usuarios
export async function getUsers() {
  const res = await fetch('https://dummyjson.com/users');
  if (!res.ok) {
    throw new Error('Error al obtener usuarios');
  }
  return await res.json(); // contiene .users
}
