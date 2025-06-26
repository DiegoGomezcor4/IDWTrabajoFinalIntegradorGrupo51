// Precios de servicios fijos
const preciosServicios = {
    "Catering": 25000,
    "Fiesta temática": 15000,
    "Música y entretenimiento": 20000,
    "Fotografía y vídeo": 30000
};

// Variables globales para precios
let precioSalonSeleccionado = 0;
let salones = [];

// Función para cargar salones desde localStorage
function cargarSalones() {
    const selectSalones = document.getElementById('salones');
    
    // Obtener salones del localStorage
    const salonesGuardados = localStorage.getItem('salones');
    
    if (salonesGuardados) {
        salones = JSON.parse(salonesGuardados);
        
        // Limpiar opciones existentes (excepto la primera "Elegir")
        selectSalones.innerHTML = '<option value="" selected>Elegir</option>';
        
        // Agregar cada salón como una opción
        salones.forEach((salon, index) => {
            const option = document.createElement('option');
            option.value = index; // Usar índice para poder acceder al precio
            
            // Verificar si existe la propiedad ubicacion y precio
            const ubicacion = salon.ubicacion || salon.direccion || salon.localidad || salon.lugar;
            const precio = salon.precio || 0;
            
            let textoOpcion = salon.nombre;
            if (ubicacion) {
                textoOpcion += ` - ${ubicacion}`;
            }
            textoOpcion += ` ($${precio.toLocaleString()})`;
            
            option.textContent = textoOpcion;
            selectSalones.appendChild(option);
        });
        
        // Debug: mostrar estructura del primer salón en consola
        if (salones.length > 0) {
            console.log('Estructura del primer salón:', salones[0]);
        }
    } else {
        // Si no hay salones guardados, mostrar mensaje
        selectSalones.innerHTML = '<option value="" selected>No hay salones disponibles</option>';
    }
}

// Función para calcular y mostrar el total
function calcularTotal() {
    let total = 0;
    
    // Sumar precio del salón
    const salonSelect = document.getElementById('salones');
    if (salonSelect.value !== '') {
        const salonIndex = parseInt(salonSelect.value);
        total += salones[salonIndex].precio || 0;
        precioSalonSeleccionado = salones[salonIndex].precio || 0;
    }
    
    // Sumar precios de servicios
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        total += preciosServicios[checkbox.value] || 0;
    });
    
    // Mostrar el total
    actualizarMostrarTotal(total);
}

// Función para actualizar la visualización del total
function actualizarMostrarTotal(total) {
    let totalElement = document.getElementById('totalPresupuesto');
    if (!totalElement) {
        // Crear elemento si no existe
        totalElement = document.createElement('div');
        totalElement.id = 'totalPresupuesto';
        totalElement.className = 'alert alert-info mt-3';
        
        // Insertarlo antes del botón de enviar
        const boton = document.querySelector('.d-grid');
        boton.parentNode.insertBefore(totalElement, boton);
    }
    
    if (total > 0) {
        totalElement.innerHTML = `
            <h5>Total estimado: $${total.toLocaleString()}</h5>
            <small class="text-muted">*Este es un presupuesto estimativo. El precio final puede variar según los detalles específicos del evento.</small>
        `;
        totalElement.style.display = 'block';
    } else {
        totalElement.style.display = 'none';
    }
}

// Función para manejar el envío del formulario
function manejarFormulario(event) {
    event.preventDefault();
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombrePresupuesto').value;
    const fecha = document.getElementById('fecha').value;
    const salonIndex = document.getElementById('salones').value;
    const evento = document.getElementById('evento').value;
    
    // Obtener servicios seleccionados con precios
    const serviciosSeleccionados = [];
    let totalServicios = 0;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        const precio = preciosServicios[checkbox.value] || 0;
        serviciosSeleccionados.push({
            nombre: checkbox.value,
            precio: precio
        });
        totalServicios += precio;
    });
    
    // Validar que se hayan completado los campos requeridos
    if (!nombre || !fecha || salonIndex === '' || !evento) {
        alert('Por favor, complete todos los campos requeridos.');
        return;
    }
    
    // Obtener datos del salón seleccionado
    const salonSeleccionado = salones[parseInt(salonIndex)];
    const totalGeneral = (salonSeleccionado.precio || 0) + totalServicios;
    
    // Crear objeto con los datos del presupuesto
    const presupuesto = {
        id: Date.now(),
        nombre: nombre,
        fecha: fecha,
        salon: {
            nombre: salonSeleccionado.nombre,
            precio: salonSeleccionado.precio || 0,
            ubicacion: salonSeleccionado.ubicacion || salonSeleccionado.direccion || ''
        },
        evento: evento,
        servicios: serviciosSeleccionados,
        precios: {
            salon: salonSeleccionado.precio || 0,
            servicios: totalServicios,
            total: totalGeneral
        },
        fechaSolicitud: new Date().toISOString(),
        estado: 'Pendiente'
    };
    
    // Guardar en localStorage
    guardarPresupuesto(presupuesto);
    
    // Mostrar mensaje de confirmación con el total
    alert(`Presupuesto enviado correctamente.\nTotal estimado: $${totalGeneral.toLocaleString()}\nNos pondremos en contacto contigo pronto.`);
    
    // Limpiar formulario
    document.getElementById('formPresupuestos').reset();
    actualizarMostrarTotal(0); // Ocultar total
}

// Función para guardar presupuesto en localStorage
function guardarPresupuesto(presupuesto) {
    const presupuestosGuardados = localStorage.getItem('presupuestos');
    let presupuestos = [];
    
    if (presupuestosGuardados) {
        presupuestos = JSON.parse(presupuestosGuardados);
    }
    
    presupuestos.push(presupuesto);
    localStorage.setItem('presupuestos', JSON.stringify(presupuestos));
    
    console.log('Presupuesto guardado:', presupuesto);
}

// Función para agregar precios por defecto a salones existentes (si no los tienen)
function actualizarSalonesConPrecios() {
    const salonesGuardados = localStorage.getItem('salones');
    if (salonesGuardados) {
        const salones = JSON.parse(salonesGuardados);
        let actualizado = false;
        
        salones.forEach(salon => {
            if (!salon.precio) {
                // Asignar precio por defecto basado en capacidad o aleatorio
                salon.precio = salon.capacidad ? salon.capacidad * 500 : Math.floor(Math.random() * 50000) + 30000;
                actualizado = true;
            }
        });
        
        if (actualizado) {
            localStorage.setItem('salones', JSON.stringify(salones));
            console.log('Salones actualizados con precios por defecto');
        }
    }
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar salones con precios si no los tienen
    actualizarSalonesConPrecios();
    
    // Cargar salones
    cargarSalones();
    
    // Agregar event listeners
    const formulario = document.getElementById('formPresupuestos');
    formulario.addEventListener('submit', manejarFormulario);
    
    // Event listener para cambio de salón
    const selectSalones = document.getElementById('salones');
    selectSalones.addEventListener('change', calcularTotal);
    
    // Event listeners para checkboxes de servicios
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calcularTotal);
    });
});

// Función opcional: actualizar salones si se modifican desde otra página
window.addEventListener('storage', function(e) {
    if (e.key === 'salones') {
        cargarSalones();
        calcularTotal();
    }
});