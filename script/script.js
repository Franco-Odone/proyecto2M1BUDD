document.getElementById('btn').addEventListener('click', guardar);

var row = null;
var idParaKeys;

// Función 'Create'
function guardar() {

    let x = inputData();
    let y = dataLocalStorage(x);
    if (row == null) {
        mostrar(y);
        document.getElementById('msg').innerHTML = 'Tarea Guardada';
    }else {
        update();
        document.getElementById('msg').innerHTML = 'Tarea Editada';
    }
}

// Create 
// Con esta función se obtienen los valores de los inputs
function inputData() {

    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let tarea = document.getElementById('tarea').value;
    let descripcion = document.getElementById('descripcion').value;

    let arr = [nombre, apellido, tarea, descripcion];
    return arr;    
}

// Read 
// Con esta función se crean los 'Key' y los 'Value' en el local storage y a la vez se obtienen de vuelta 
function dataLocalStorage(x) {

    idParaKeys = Math.floor(Math.random() * 9999);
    
    const storage = window.localStorage;
    // obtengo desde el storage, el key acumulador.
    let valida = storage.getItem(`infoData ${idParaKeys}`);
    let acumula = [];
    // si no existe el key acumulador, no hago nada. Pero si existe, lo obtengo.
    if (valida != null){
        // es convertir un string json en un arreglo para manipularlo en JS.
        acumula = JSON.parse(storage.getItem(`infoData ${idParaKeys}`));
    }
    const valor1 = x[0];
    const valor2 = x[1];
    const valor3 = x[2];
    const valor4 = x[3];


    // agregar al arreglo acumula, el valor en el input
    acumula.push(valor1);
    acumula.push(valor2);
    acumula.push(valor3);
    acumula.push(valor4);
    // tomo el arreglo acumula, y lo parseo como JSON y lo guardo en el local storage
    storage.setItem(`infoData ID: ${idParaKeys}`, JSON.stringify(acumula));
    
    
    let n = acumula[0];
    let a= acumula[1];
    let t = acumula[2];
    let d = acumula[3];
    // console.log(acumula);
    
    let arr = [n, a, t, d];
    return arr;
    
}

// Con esta función se muestran los elementos en la tabla 
function mostrar(y) {

    var row = document.getElementById('tbody').insertRow();
    let editar = document.createElement('button');
    editar.innerHTML = 'Editar';
    // editar.setAttribute('id', 'editar');
    editar.setAttribute('onclick', 'edit(this)');
    let eliminar = document.createElement('button');
    eliminar.innerHTML = 'Eliminar';
    // eliminar.setAttribute('id', 'eliminar');
    eliminar.setAttribute('onclick', 'del(this)');

    row.insertCell(0).innerHTML = y[0];
    row.insertCell(1).innerHTML = y[1];
    row.insertCell(2).innerHTML = y[2];
    row.insertCell(3).innerHTML = y[3];
    let a = row.insertCell(4);
    a.appendChild(eliminar);
    a.appendChild(editar);   

}

// Edit
function edit(col) {

    row = col.parentElement.parentElement;

    document.getElementById('nombre').value = row.cells[0].innerHTML;
    document.getElementById('apellido').value = row.cells[1].innerHTML;
    document.getElementById('tarea').value = row.cells[2].innerHTML;
    document.getElementById('descripcion').value = row.cells[3].innerHTML;
}
// Update
function update() {

    row.cells[0].innerHTML = document.getElementById('nombre').value;
    row.cells[1].innerHTML = document.getElementById('apellido').value;
    row.cells[2].innerHTML = document.getElementById('tarea').value;
    row.cells[3].innerHTML = document.getElementById('descripcion').value;

}
// Delete
function del(col) {
    
    let pregunta = confirm('Confirme que desea eliminar esta tarea');

    if (pregunta == true) {

        row = col.parentElement.parentElement;
        document.getElementById('table').deleteRow(row.rowIndex);
    }

}