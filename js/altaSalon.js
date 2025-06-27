const formsalon = document.getElementById("formSalones");
const btnGuardar = document.getElementById("btnGuardar");
let indexEditando = -1;

formsalon.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const direccion = document.getElementById("dir").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;
    const estado = document.getElementById("estado").value;
    const imagen = document.getElementById("imagen");
    const imagenFile = imagen.files[0];

    const tamanioImagen = 1024 * 1024; // 1MB

    if (imagenFile && imagenFile.size > tamanioImagen) {
        alert("La imagen debe pesar menos de 1MB");
        return;
    }

    const salones = JSON.parse(localStorage.getItem("salones")) || [];

    const nuevoId =
        indexEditando === -1
            ? salones.reduce((max, salon) => Math.max(max, salon.id || 0), 0) + 1
            : salones[indexEditando].id;

    if (imagenFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imagenBase64 = e.target.result;
            const salon = {
                id: nuevoId,
                nombre,
                direccion,
                descripcion,
                precio,
                estado,
                imagen: imagenBase64
            };
            guardarSalon(salon);
        };
        reader.readAsDataURL(imagenFile);
    } else {
        const imagenAnterior =
            indexEditando !== -1 ? salones[indexEditando].imagen : null;

        if (!imagenAnterior) {
            alert("Seleccionar imagen");
            return;
        }

        const salon = {
            id: nuevoId,
            nombre,
            direccion,
            descripcion,
            precio,
            estado,
            imagen: imagenAnterior
        };
        guardarSalon(salon);
    }
});

function guardarSalon(salon) {
    const salones = JSON.parse(localStorage.getItem("salones")) || [];

    if (indexEditando === -1) {
        salones.push(salon);
    } else {
        salones[indexEditando] = salon;
        indexEditando = -1;
    }

    localStorage.setItem("salones", JSON.stringify(salones));
    console.log("Salones guardados:", salones);

    formsalon.reset();
    btnGuardar.textContent = "Guardar";

    if (typeof verSalones === "function") {
        verSalones();
    }
}
