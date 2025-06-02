function deleteSalon(id){
    const salones = JSON.parse(localStorage.getItem(`salones`)) || [];
    const salon = salones[id];
    salones.splice(id,1);
    localStorage.setItem(`salones`, JSON.stringify(salones));
    mostrarSalones();
}
function editSalon(id){
    const salones = JSON.parse(localStorage.getItem(`salones`)) || [];
    const salon = salones[id];
    
    document.getElementById(`nombre`).value = salon.nombre;
    document.getElementById(`dir`).value = salon.direccion;
    document.getElementById(`descripcion`).value = salon.descripcion;
    
    salones.splice(id,1);
    localStorage.setItem(`salones`, JSON.stringify(salones));
}