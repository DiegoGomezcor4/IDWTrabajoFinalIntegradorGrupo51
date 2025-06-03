const formsalon = document.getElementById(`formSalones`);
let indexEditando = -1;

formsalon.addEventListener(`submit`, function(event) {
    event.preventDefault();

    const nombre = document.getElementById(`nombre`).value;
    const direccion = document.getElementById(`dir`).value;
    const descripcion = document.getElementById(`descripcion`).value;
    const imagen = document.getElementById(`imagen`);
    const imagenFile = imagen.files[0];

    const reader = new FileReader();

    reader.onload = function(e) {
        const imagenBase64 = e.target.result;
    
    
        const salon = {nombre, direccion, descripcion, imagen: imagenBase64};
        const salones = JSON.parse(localStorage.getItem(`salones`)) || [];

        if (indexEditando === -1) {
        // Agregar nuevo
        salones.push(salon);
        } else {
        // Editar existente
        salones[indexEditando] = salon;
        indexEditando = -1;
        }
        localStorage.setItem(`salones`, JSON.stringify(salones));
        formsalon.reset();
        verSalones();
    }
        reader.readAsDataURL(imagenFile);
    
});
