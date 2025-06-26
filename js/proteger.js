if (!sessionStorage.getItem('token')) {
  alert('Acceso denegado. Por favor inicie sesión.');
  window.location.href = 'login.html';
}
