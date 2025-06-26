const formSalones = document.getElementById("formSalones");
const btnGuardar = document.getElementById("btnGuardar");
let indexEditando = -1;

formSalones.addEventListener(`submit`, function(event) {
    event.preventDefault();

    const nombre = document.getElementById(`nombre`).value;
    const descripcion = document.getElementById(`descripcion`).value;
    const precio = document.getElementById('precio').value;
    
    const servicios = JSON.parse(localStorage.getItem("servicios")) || [];
const nuevaId = indexEditando === -1
        ? servicios.reduce((max, servicio) => Math.max(max, servicio.id || 0), 0) + 1
        : servicios[indexEditando].id;

function guardarServicio(servicio){
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    
    if (indexEditando === -1) {
        //agregar nuevo servicio
        servicios.push(servicio);
    } else {
        //editar servicio existente
        servicios[indexEditando] = servicio;
    }
    
    localStorage.setItem('servicios', JSON.stringify(servicios));
    alert("Servicio guardado correctamente");
    formServicios.reset();
    indexEditando = -1;
}

}