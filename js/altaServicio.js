const formServicios = document.getElementById("formServicios");
const btnGuardar = document.getElementById("btnGuardar");
let indexEditando = -1;

formServicios.addEventListener(`submit`, function(event) {
    event.preventDefault();

    const nombre = document.getElementById(`nombre`).value;
    const descripcion = document.getElementById(`descripcion`).value;
    const precio = document.getElementById('precio').value;
    
    const servicios = JSON.parse(localStorage.getItem("servicios")) || [];
    
    const nuevaId = indexEditando === -1
            ? servicios.reduce((max, servicio) => Math.max(max, servicio.id || 0), 0) + 1
            : servicios[indexEditando].id;

    const servicio = {id: nuevaId, nombre, descripcion, precio}
    guardarServicio(servicio)
    });
    function guardarServicio(servicio){
        const servicios =  JSON.parse(localStorage.getItem('servicios')) || [];
        
        if (indexEditando === -1) {
        // Agregar nuevo
            servicios.push(servicio);
        } else {
            // Editar existente
            servicios[indexEditando] = servicio;
            indexEditando = -1;
            }

            localStorage.setItem(`servicios`, JSON.stringify(servicios));
            formServicios.reset();
            verServicios();
            btnGuardar.textContent = "Guardar";
        }
