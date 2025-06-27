const serviciosprecargados1 = [
{
    id:1,
    imagen: "imagenes/catalogo1.jpg",
    nombre: "Catering",
    descripcion:"Menús variados y adaptados a tus gustos, con opciones para todos los paladares.",
    precio: 350000
},
{
    id:2,
    imagen: "imagenes/catalogo2.jpg",
    nombre: "Fiestas temáticas",
    descripcion:"Unicornios, superhéroes, princesas y mucho más para imaginar sin límites.",
    precio: 120000
},
{
    id:3,
    imagen: "imagenes/fotografia.jpeg",
    nombre: "Fotografía y video",
    descripcion:"Capturamos los mejores momentos con servicios de fotografía y video profesional.",
    precio: 25000
},
{
    id:4,
    imagen: "imagenes/entretenimiento.jpg",
    nombre: "Música y entretenimiento",
    descripcion:"DJ profesionales, bandas en vivo y shows para que la diversión no falte en tu celebración.",
    precio: 90000
},


]

const salonesPrecargados1 = [
{
    id:1,
    imagen: "imagenes/salones/salon1.jpg",
    nombre: "Salón Primavera",
    descripcion:"Un espacio cálido, ideal para cumpleaños infantiles con capacidad para 50 personas.",
    direccion: "Av. las Heras 3086, CABA",
    precio: 200000,
    estado: "Disponible"
},
{
    id:2,
    imagen: "imagenes/salones/salon2.jpg",
    nombre: "Salón arcoíris",
    descripcion:"Decoración colorida, zona de juegos, inflables y una cocina equipada para meriendas.",
    direccion: "Av. Cabildo 834, CABA",
    precio: 350000,
    estado: "Reservado"
},
{
    id:3,
    imagen: "imagenes/salones/salon3.jpg",
    nombre: "Salón estelar",
    descripcion:"Perfecto para fiestas temáticas. Incluye luces LED, pista de baile y sonido profesional.",
    direccion: "Av. las Heras 3086, CABA",
    precio: 400000,
    estado: "Reservado"
},
]

// cargar salones y servicios predeterminados en el Localstorage
function precargarSalones(){
    const salonesGuardados = JSON.parse(localStorage.getItem("salones")) || [];
    if (salonesGuardados.length === 0){
        localStorage.setItem("salones", JSON.stringify(salonesPrecargados1));
    }
}
function precargarServicios() {
    const serviciosGuardados = JSON.parse(localStorage.getItem("servicios")) || [];
    if (serviciosGuardados.length === 0) {
        localStorage.setItem("servicios", JSON.stringify(serviciosprecargados1));
    }
}

// Funciones para mostrar los eventos y salones en el catálogo

function mostrarServicios() {
    const catalogoServicios = document.getElementById("catalogoServicios");
    const listaServicios = JSON.parse(localStorage.getItem("servicios")) || [];
    catalogoServicios.innerHTML = "";
    listaServicios.forEach(servicio => {
    const card = `
    <div class="col">
        <div class="card">
            <img src="${servicio.imagen}" class="card-img-fluid object-fit-cover w-100" style="height: 180px;" alt="${servicio.nombre}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${servicio.nombre}</h5>
                <p class="card-text">${servicio.descripcion}</p>
            </div>
            <div class="card-footer bg-light border-top d-flex justify-content-between align-items-center">
                <p class="card-text fw-bold fs-3">$${servicio.precio}</p>
            
                <div>
                    <a href="contacto.html"><button type="button" class="btn btn-outline-secondary ">Cotizar</button></a>
                </div>   
            </div>
        </div>
    </div>
    `;
    catalogoServicios.innerHTML += card;
    }
    );
}

function mostrarSalones() {
    const catalogoSalones = document.getElementById("catalogoSalones");
    const listaSalones = JSON.parse(localStorage.getItem("salones")) || [];
    catalogoSalones.innerHTML = "";

    listaSalones.forEach(salon => {
         
    const card = `
    <div class="col">
        <div class="card">
            <img src="${salon.imagen}" class="card-img-fluid object-fit-cover w-100" style="height: 180px;" alt="${salon.nombre}">
            <div class="card-body d-flex flex-column">
                
                <h5 class="card-title">${salon.nombre}</h5>
                <p class="card-text">${salon.direccion}</p>
                <p class="card-text">${salon.descripcion}</p>
                <p class="card-text">Estado: ${salon.estado}</p>
            </div>
            <div class="card-footer bg-light border-top d-flex justify-content-between align-items-center">
                <p class="card-text fw-bold fs-3">$${salon.precio}</p>
                <div>
                    <a href="contacto.html"><button type="button" class="btn btn-outline-secondary ">Cotizar</button></a>
                </div>   
            </div>
        </div>
    </div>
    `;
    catalogoSalones.innerHTML += card;
    }
    );

}

// Llamar a las funciones para mostrar los servicios y salones al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    precargarSalones();
    precargarServicios();
    mostrarServicios();
    mostrarSalones();
});