const apiURL = "https://dummyjson.com/users";
const usuariosContainer = document.getElementById("usuariosContainer");
const searchInput = document.getElementById("searchInput");
const alertContainer = document.getElementById("alertContainer");

let usuarios = [];

function mostrarAlerta(mensaje, tipo = "success") {
  const alert = document.createElement("div");
  alert.className = `alert alert-${tipo} alert-dismissible fade show`;
  alert.innerHTML = `
    ${mensaje}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  alertContainer.appendChild(alert);
  setTimeout(() => alert.remove(), 4000);
}

function renderUsuarios(lista) {
  usuariosContainer.innerHTML = "";
  lista.forEach(usuario => {
    const card = document.createElement("div");
    card.className = "col-md-6";
    card.innerHTML = `
      <div class="card shadow-sm">
        <div class="card-body">
          <div class="user-row mb-2">
            <img src="${usuario.image || 'https://via.placeholder.com/60'}" class="avatar" alt="avatar">
            <div>
              <h5 class="card-title mb-0">${usuario.firstName} ${usuario.lastName}</h5>
              <small class="text-muted">@${usuario.username}</small>
            </div>
          </div>
          <p class="card-text mb-1"><strong>Email:</strong> ${usuario.email}</p>
          <p class="card-text mb-1"><strong>Teléfono:</strong> ${usuario.phone}</p>
          <div class="d-flex justify-content-end">
            <button class="btn btn-sm btn-primary me-2" onclick="abrirEditar(${usuario.id})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
          </div>
        </div>
      </div>
    `;
    usuariosContainer.appendChild(card);
  });
}

function filtrarUsuarios() {
  const filtro = searchInput.value.toLowerCase();
  const filtrados = usuarios.filter(u =>
    u.firstName.toLowerCase().includes(filtro) ||
    u.lastName.toLowerCase().includes(filtro) ||
    u.username.toLowerCase().includes(filtro)
  );
  renderUsuarios(filtrados);
}

async function cargarUsuarios() {
  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    usuarios = data.users;
    renderUsuarios(usuarios);
  } catch (err) {
    mostrarAlerta("Error al cargar usuarios", "danger");
  }
}

// Agregar usuario
document.getElementById("formAgregar").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const nuevo = Object.fromEntries(new FormData(form));
  try {
    const res = await fetch(apiURL + "/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo)
    });
    const data = await res.json();
    usuarios.unshift(data);
    renderUsuarios(usuarios);
    bootstrap.Modal.getInstance(form.closest(".modal")).hide();
    mostrarAlerta("Usuario agregado exitosamente");
    form.reset();
  } catch {
    mostrarAlerta("Error al agregar usuario", "danger");
  }
});

// Editar
window.abrirEditar = function(id) {
  const usuario = usuarios.find(u => u.id === id);
  const form = document.getElementById("formEditar");
  form.id.value = usuario.id;
  form.firstName.value = usuario.firstName;
  form.lastName.value = usuario.lastName;
  form.username.value = usuario.username;
  form.email.value = usuario.email;
  form.phone.value = usuario.phone;
  new bootstrap.Modal(document.getElementById("modalEditar")).show();
};

document.getElementById("formEditar").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const id = form.id.value;
  const actualizado = Object.fromEntries(new FormData(form));
  try {
    const res = await fetch(`${apiURL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(actualizado)
    });
    const data = await res.json();
    usuarios = usuarios.map(u => u.id == id ? { ...u, ...data } : u);
    renderUsuarios(usuarios);
    bootstrap.Modal.getInstance(form.closest(".modal")).hide();
    mostrarAlerta("Usuario actualizado");
  } catch {
    mostrarAlerta("Error al actualizar usuario", "danger");
  }
});

// Eliminar
window.eliminarUsuario = async function(id) {
  if (!confirm("¿Eliminar este usuario?")) return;
  try {
    await fetch(`${apiURL}/${id}`, { method: "DELETE" });
    usuarios = usuarios.filter(u => u.id !== id);
    renderUsuarios(usuarios);
    mostrarAlerta("Usuario eliminado");
  } catch {
    mostrarAlerta("Error al eliminar usuario", "danger");
  }
};

searchInput.addEventListener("input", filtrarUsuarios);
document.addEventListener("DOMContentLoaded", cargarUsuarios);
