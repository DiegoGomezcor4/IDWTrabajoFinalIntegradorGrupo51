const eventos = [
    {
        imagen: "imagenes/catalogo1.jpg",
        titulo: "Cumpleaños infantiles",
        descripcion: "Diversión asegurada con juegos, decoración y animación personalizada."
    },
    {
        imagen: "imagenes/catalogo2.jpg",
        titulo: "Fiestas temáticas",
        descripcion: "Unicornios, superhéroes, princesas y mucho más para imaginar sin límites."
    },
    {
        imagen: "imagenes/catalogo3.jpg",
        titulo: "Tardes de juegos",
        descripcion: "Juegos cooperativos, inflables y dinámicas pensadas para todas las edades."
    },
    {
        imagen: "imagenes/catalogo4-2.jpg",
        titulo: "Mini disco",
        descripcion: "Luces, música y baile para que los chicos vivan una fiesta como grandes."
    },
    {
        imagen: "imagenes/catalogo5.jpg",
        titulo: "Picnics y meriendas especiales",
        descripcion: "Momentos al aire libre llenos de color, dulzura y juegos tranquilos."
    }
];

const salonesIniciales = [
    {
        imagen: "imagenes/salones/salon1.jpg",
        nombre: "Salón Primavera",
        descripcion: "Un espacio cálido, ideal para cumpleaños infantiles con capacidad para 50 personas."
    },
    {
        imagen: "imagenes/salones/salon2.jpg",
        nombre: "Salón arcoíris",
        descripcion: "Decoración colorida, zona de juegos, inflables y una cocina equipada para meriendas. Capacidad para 60 personas."
    },
    {
        imagen: "imagenes/salones/salon3.jpg",
        nombre: "Salón estelar",
        descripcion: "Perfecto para fiestas temáticas. Incluye luces LED, pista de baile y sonido profesional. Capacidad para 80 personas."
    }
];

// Función para inicializar localStorage con salones por defecto
function inicializarSalones() {
    const salonesGuardados = localStorage.getItem("salones");
    
    if (!salonesGuardados) {
        localStorage.setItem("salones", JSON.stringify(salonesIniciales));
        console.log("✅ Salones inicializados en localStorage");
        return salonesIniciales;
    } else {
        console.log("ℹ️ Los salones ya existen en localStorage");
        return JSON.parse(salonesGuardados);
    }
}

// Función para obtener salones del localStorage
function obtenerSalones() {
    const salonesGuardados = localStorage.getItem("salones");
    if (salonesGuardados) {
        return JSON.parse(salonesGuardados);
    } else {
        console.log("⚠️ No hay salones en localStorage, usando salones iniciales");
        return salonesIniciales;
    }
}

// Función para mostrar los eventos en el catálogo
function mostrarEventos() {
    const catalogoEventos = document.getElementById("catalogoEventos");
    
    if (!catalogoEventos) {
        console.error("❌ No se encontró el elemento catalogoEventos");
        return;
    }
    
    catalogoEventos.innerHTML = ""; // Limpiar contenido previo
    
    eventos.forEach(evento => {
        const card = `
            <div class="col">
                <div class="card">
                    <img src="${evento.imagen}" class="card-img-fluid object-fit-cover w-100" style="height: 180px;" alt="${evento.titulo}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${evento.titulo}</h5>
                        <p class="card-text">${evento.descripcion}</p>
                        <div class="mt-auto d-flex justify-content-end">
                            <a href="contacto.html">
                                <button type="button" class="btn btn-outline-secondary">Cotizar</button>
                            </a>
                        </div>                            
                    </div>
                </div>
            </div>
        `;
        catalogoEventos.innerHTML += card;
    });
    
    console.log(`✅ Se mostraron ${eventos.length} eventos`);
}

// Función para mostrar los salones del localStorage
function mostrarSalones() {
    const catalogoSalones = document.getElementById("catalogoSalones");
    
    if (!catalogoSalones) {
        console.error("❌ No se encontró el elemento catalogoSalones");
        return;
    }
    
    catalogoSalones.innerHTML = ""; // Limpiar contenido previo
    
    const listaSalones = obtenerSalones();
    console.log("📋 Salones a mostrar:", listaSalones);
    
    listaSalones.forEach(salon => {
        const card = `
            <div class="col">
                <div class="card">
                    <img src="${salon.imagen}" class="card-img-fluid object-fit-cover w-100" style="height: 180px;" alt="${salon.nombre}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${salon.nombre}</h5>
                        <p class="card-text">${salon.descripcion}</p>
                        <div class="mt-auto d-flex justify-content-end">
                            <a href="contacto.html">
                                <button type="button" class="btn btn-outline-secondary">Cotizar</button>
                            </a>
                        </div>                                              
                    </div>
                </div>
            </div>
        `;
        catalogoSalones.innerHTML += card;
    });
    
    console.log(`✅ Se mostraron ${listaSalones.length} salones`);
}

// Inicializar cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Página cargada, iniciando proceso...");
    
    // 1. Inicializar localStorage con salones
    inicializarSalones();
    
    // 2. Mostrar eventos y salones
    mostrarEventos();
    mostrarSalones();
    
    // 3. Verificar localStorage (para debugging)
    const salonesEnStorage = localStorage.getItem("salones");
    console.log("💾 Contenido de localStorage 'salones':", salonesEnStorage);
    
    console.log("✅ Proceso completado");
});