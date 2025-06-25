export async function login(username, password) {
  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error('Credenciales inválidas');
  }

  return await res.json(); // 👈 devolvemos todo el objeto
}
