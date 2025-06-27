function verSalones() {
    const table = document.querySelector(`#tabla tbody`);
    table.innerHTML = ``;

    const salones = JSON.parse(localStorage.getItem(`salones`)) || [];

    salones.forEach((salon, index) => {
        const fila = document.createElement(`tr`);
        fila.innerHTML = `
            <td>${salon.nombre}</td>
            <td>${salon.direccion}</td>
            <td>${salon.descripcion}</td>
            <td>${salon.precio}</td>
            <td>${salon.estado}</td>
            <td><img src="${salon.imagen}" alt="${salon.nombre}" style = "max-width: 120px; height: auto;"></td>
            <td>
                <button class="btn btn-primary btn-sm mx-1 my-1" onclick="editSalon(${index})">Editar</button>
                <button class="btn btn-danger btn-sm mx-1 my-1" onclick="deleteSalon(${index})">Eliminar</button>
            </td>
        `;
        table.appendChild(fila);
    });
}

function deleteSalon(index) {
    const salones = JSON.parse(localStorage.getItem(`salones`)) || [];
    salones.splice(index, 1); // Elimina 1 elemento en la posición index
    localStorage.setItem(`salones`, JSON.stringify(salones));
    verSalones();
}

function editSalon(index) {
    const salones = JSON.parse(localStorage.getItem(`salones`)) || [];
    const salon = salones[index];

    document.getElementById(`nombre`).value = salon.nombre;
    document.getElementById(`dir`).value = salon.direccion;
    document.getElementById(`descripcion`).value = salon.descripcion;
    document.getElementById("precio").value = salon.precio;
    document.getElementById("estado").value = salon.estado;

    // Variable global definida en altaSalon.js
    indexEditando = index;
    btnGuardar.textContent = "Actualizar";
    
}

// Ejecutar al cargar
verSalones();
