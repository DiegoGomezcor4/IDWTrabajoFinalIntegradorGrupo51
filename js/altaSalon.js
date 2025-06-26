const formsalon = document.getElementById("formSalones");
const btnGuardar = document.getElementById("btnGuardar");
let indexEditando = -1;

formsalon.addEventListener(`submit`, function(event) {
    event.preventDefault();

    const nombre = document.getElementById(`nombre`).value;
    const direccion = document.getElementById(`dir`).value;
    const descripcion = document.getElementById(`descripcion`).value;
    const precio = document.getElementById('precio').value;
    const imagen = document.getElementById(`imagen`);
    const imagenFile = imagen.files[0];
    
        // Controlar imagen
        const tamanioImagen = 1024 * 1024;

        if (imagenFile && imagenFile.size > tamanioImagen){
            alert('La imagen debe pesar menos de 1MB');
            return;
        }
        
        if(imagenFile){
            const reader = new FileReader();
            reader.onload = function(e) {
            const imagenBase64 = e.target.result;
            guardarSalon({nombre, direccion, descripcion,precio,imagen:imagenBase64});
            };    
            reader.readAsDataURL(imagenFile);
        }else{
            
            const salones = JSON.parse(localStorage.getItem("salones")) || [];
            const imagenAnterior = indexEditando !== -1 ? salones[indexEditando].imagen: null;
            
            if(!imagenAnterior){
                alert("Seleccionar imagen");
                    return;
                }

                guardarSalon({nombre, direccion, descripcion,precio,imagen: imagenAnterior});
            }
    });

    function guardarSalon(salon){
        const salones =  JSON.parse(localStorage.getItem('salones')) || [];
        
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
            btnGuardar.textContent = "Guardar";
        }
