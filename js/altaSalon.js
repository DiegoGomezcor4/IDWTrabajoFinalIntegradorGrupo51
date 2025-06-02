const exit = document.getElementById(`salir`)
if (exit){
    exit.addEventListener(`click`, () => {
        sessionStorage.clear();
        window.location.href = `admin-salones.html`
    })
}

let idNum = 0 ;
const formsalon = document.getElementById(`formSalones`);
formsalon.addEventListener(`submit`, function(event){
    event.preventDefault();

    const nombre = document.getElementById(`nombre`).value;
    const direccion = document.getElementById(`dir`).value;
    const descripcion = document.getElementById(`descripcion`).value;
    const id = idNum++

    const salon = {nombre, direccion, descripcion, id};
    const salones = JSON.parse(localStorage.getItem(`salones`)) || [];
    salones.push(salon);
    localStorage.setItem(`salones`, JSON.stringify(salones));

    this.reset();

    verSalones();
});
verSalones();
function verSalones() {
    const table = document.querySelector(`#tabla tbody`);
    table.innerHTML = ``;
    const salones = JSON.parse(localStorage.getItem(`salones`)) || [];
    salones.forEach((salon, id) => {
        const fila = document.createElement(`tr`)
        fila.innerHTML = `
        <td>${salon.nombre}</td>
        <td>${salon.direccion}</td>
        <td>${salon.descripcion}</td>
        <td><button class="btn btn-primary btn-sm mx-1 my-1" onclick="editSalon(${id})">Editar</button> <button class="btn btn-danger btn-sm mx-1 my-1" onclick="deleteSalon(${id})">Eliminar</button></td>
        `;
        table.appendChild(fila)
    })
}