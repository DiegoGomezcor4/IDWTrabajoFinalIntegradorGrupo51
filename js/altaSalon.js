/*
--Control de sesión iniciada--
if (!sessionStorage.getItem(`user`)){
    alert(`Debe iniciar sesión`);
    window.location.href = `nombre de la pagina de login`
    return;
}

--Para cerrar sesión--
const exit = document.getElementById(`salir`)
if (exit){
    exit.addEventListener(`click`, () => {
        sessionStorage.clear();
        window.location.href = `nombre de la pagina de login`
    })
}
*/
const formsalon = document.getElementById(`formSalones`);
formsalon.addEventListener(`submit`, function(event){
    event.preventDefault();

    const nombre = document.getElementById(`nombre`).value;
    const direccion = document.getElementById(`dir`).value;
    const descripcion = document.getElementById(`descripcion`).value;

    const salon = {nombre, direccion, descripcion};
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
    salones.forEach((salon) => {
        const fila = document.createElement(`tr`)
        fila.innerHTML = `
        <td>${salon.nombre}</td>
        <td>${salon.direccion}</td>
        <td>${salon.descripcion}</td>
        `;
        table.appendChild(fila)
    })
}