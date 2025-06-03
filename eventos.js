const eventos = [
{
    imagen: "imagenes/catalogo1.jpg",
    titulo: "Cumpleaños infantiles",
    descripcion:"Diversión asegurada con juegos, decoración y animación personalizada."
},
{
    imagen: "imagenes/catalogo2.jpg",
    titulo: "Fiestas temáticas",
    descripcion:"Unicornios, superhéroes, princesas y mucho más para imaginar sin límites."
},
{
    imagen: "imagenes/catalogo3.jpg",
    titulo: "Tardes de juegos",
    descripcion:"Juegos cooperativos, inflables y dinámicas pensadas para todas las edades."
},
{
    imagen: "imagenes/catalogo4-2.jpg",
    titulo: "Mini disco",
    descripcion:"Luces, música y baile para que los chicos vivan una fiesta como grandes."
},
{
    imagen: "imagenes/catalogo5.jpg",
    titulo: "Picnics y meriendas especiales",
    descripcion:"Momentos al aire libre llenos de color, dulzura y juegos tranquilos."
},
]

const salones = [
{
    imagen: "imagenes/salones/salon1.jpg",
    nombre: "Salón Primavera",
    descripcion:"Un espacio cálido, ideal para cumpleaños infantiles con capacidad para 50 personas."
},
{
    imagen: "imagenes/salones/salon2.jpg",
    nombre: "Salón arcoíris",
    descripcion:"Decoración colorida, zona de juegos, inflables y una cocina equipada para meriendas. Capacidad para 60 personas."
},
{
    imagen: "imagenes/salones/salon3.jpg",
    nombre: "Salón estelar",
    descripcion:"Perfecto para fiestas temáticas. Incluye luces LED, pista de baile y sonido profesional. Capacidad para 80 personas."

}
]

function UnificarSalones(){
    const salonesLocales = JSON.parse(localStorage.getItem("salones")) || [];
    return [...salonesLocales, ...salones];
}
// Funciones para mostrar los eventos y salones en el catálogo

function mostrarEventos() {
    const catalogoEventos = document.getElementById("catalogoEventos");
    eventos.forEach(evento => {
        const card = `
    <div class="col">
        <div class="card">
            <img src="${evento.imagen}" class="card-img-fluid object-fit-cover w-100" style="height: 180px;" alt="${evento.titulo}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${evento.titulo}</h5>
                <p class="card-text">${evento.descripcion}</p>
                <div class="mt-auto f-flex justify-content-end">
                    <a href="contacto.html"><button type="button" class="btn btn-outline-secondary ">Cotizar</button></a>
                </div>
                
            </div>
        </div>
    </div>
    `;
    catalogoEventos.innerHTML += card;
    }
    );
}

function mostrarSalones() {
    const catalogoSalones = document.getElementById("catalogoSalones");
    const listaSalones = UnificarSalones();
    listaSalones.forEach(salon => {
         
        const card = `
    <div class="col">
        <div class="card">
            <img src="${salon.imagen}" class="card-img-fluid object-fit-cover w-100" style="height: 180px;" alt="${salon.nombre}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${salon.nombre}</h5>
                <p class="card-text">${salon.descripcion}</p>
                <div class="mt-auto d-flex justify-content-end">
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

// Llamar a las funciones para mostrar los eventos y salones al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    mostrarEventos();
    mostrarSalones();
});