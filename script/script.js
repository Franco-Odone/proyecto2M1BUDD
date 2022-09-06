document.getElementById('btn').addEventListener('click', guardar);

// Función 'Create'
function guardar() {

    let x = inputData();
    let y = dataLocalStorage(x);
    // console.log(y);
}

// Con esta función se obtienen los valores de los inputs
function inputData(){

    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let tarea = document.getElementById('tarea').value;
    let descripcion = document.getElementById('descripcion').value;

    let arr = [nombre, apellido, tarea, descripcion];
    return arr;    
}

// Con esta función se crean los 'Key' y los 'Value' en el local storage y a la vez se obtienen de vuelta 
function dataLocalStorage(x) {

    localStorage.setItem('Nombre', x[0]);
    localStorage.setItem('Apellido', x[1]);
    localStorage.setItem('Tarea', x[2]);
    localStorage.setItem('Descripción', x[3]);
    
    
    let n = localStorage.getItem('Nombre');
    let a= localStorage.getItem('Apellido');
    let t = localStorage.getItem('Tarea');
    let d = localStorage.getItem('Descripción');
    
    let arr = [n, a, t, d];
    return arr;
    
}