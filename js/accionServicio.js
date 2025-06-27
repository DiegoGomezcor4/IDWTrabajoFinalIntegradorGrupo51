document.addEventListener("DOMContentLoaded", () => {
  verServicios();
});

function verServicios() {
  const servicios = JSON.parse(localStorage.getItem("servicios")) || [];
  const tbody = document.querySelector("#tabla tbody");
  tbody.innerHTML = "";

  servicios.forEach((servicio, index) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${servicio.nombre}</td>
      <td>${servicio.descripcion}</td>
      <td>$${servicio.precio}</td>
      <td>
        <button class="btn btn-warning btn-sm me-2 btn-editar" data-index="${index}">Editar</button>
        <button class="btn btn-danger btn-sm btn-borrar" data-index="${index}">Borrar</button>
      </td>
    `;

    tbody.appendChild(fila);
  });

  document.querySelectorAll(".btn-editar").forEach((btn) => {
    btn.addEventListener("click", () => {
      editarServicio(parseInt(btn.dataset.index));
    });
  });

  document.querySelectorAll(".btn-borrar").forEach((btn) => {
    btn.addEventListener("click", () => {
      borrarServicio(parseInt(btn.dataset.index));
    });
  });
}

function editarServicio(index) {
  const servicios = JSON.parse(localStorage.getItem("servicios")) || [];
  const servicio = servicios[index];

  document.getElementById("nombre").value = servicio.nombre;
  document.getElementById("descripcion").value = servicio.descripcion;
  document.getElementById("precio").value = servicio.precio;

  indexEditando = index;
  document.getElementById("btnGuardar").textContent = "Actualizar";
}

function borrarServicio(index) {
  const servicios = JSON.parse(localStorage.getItem("servicios")) || [];
  servicios.splice(index, 1);
  localStorage.setItem("servicios", JSON.stringify(servicios));
  verServicios();
}
