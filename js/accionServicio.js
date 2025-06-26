function verServicios(){
    const table = document.querySelector(`#tabla tbody`);
    table.innerHTML = ``;

    const servicios = JSON.parse(localStorage.getItem(`servicios`)) || [];

    servicios.forEach((servicio, index) => {
        const fila = document.createElement(`tr`);
        fila.innerHTML = `
            <td>${servicio.nombre}</td>
            <td>${servicio.descripcion}</td>
            <td>${servicio.precio}</td>
            <td>
                <button class="btn btn-primary btn-sm mx-1 my-1" onclick="editSalon(${index})">Editar</button>
                <button class="btn btn-danger btn-sm mx-1 my-1" onclick="deleteSalon(${index})">Eliminar</button>
            </td>
        `;
        table.appendChild(fila);
    });
}