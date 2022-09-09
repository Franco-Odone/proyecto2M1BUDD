// EventListeners

// document.querySelector('form').addEventListener('submit', onSubmitForm);

document.querySelector('form').addEventListener('submit', (e) => {

    e.preventDefault();
    onSubmitForm();
    document.querySelector('form').reset();
    // se vuelve a definir la variable que selecciona la fila deseada como null para que se pueda volver a usar 
    selectedRow = null;
});

// Variables globales

var selectedRow = null;
var formData;

// Funciones

function onSubmitForm() {

    formData = readForm();
    if (selectedRow == null) {

        insertNewRecord(formData);
    } else {

        updateRecord(formData);
    };
};

function readForm() {
    // Se construye el objeto
    formData = {};
    formData['nombre'] = document.getElementById('nombre').value;
    formData['apellido'] = document.getElementById('apellido').value;
    formData['tarea'] = document.getElementById('tarea').value;
    formData['descripcion'] = document.getElementById('descripcion').value;

    return formData;

};

function insertNewRecord(formData) {

    var table = document.getElementById('listaTareas').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

    cell1 = newRow.insertCell(0);
    cell1.innerHTML = formData.nombre;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = formData.apellido;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = formData.tarea;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = formData.descripcion;

    // Se incertan los elementos que van a ser los botones de Edit y Delete, con sus respectivos eventos

    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<a onClick=editForm(this)>Edit</a><a onClick=deleteRecord(this)>Delete</a>`;
};

function deleteRecord(a) {

    // son dos parentElement porque con el primero se obtiene el padre de <a></a> que es un <td></td>, y con el otro el padre de este que es el tr que necesito
    let row = a.parentElement.parentElement;
    let x = confirm('Confirme si desea eliminar este elemento');
    
    if (x == true) {
        
        // rowIndex entrega el indice del tr que se quiere eliminar 
        document.getElementById('listaTareas').deleteRow(row.rowIndex);

    };
};

function editForm(a) {

    // son dos parentElement porque con el primero se obtiene el padre de <a></a> que es un <td></td>, y con el otro el padre de este que es el tr que necesito
    selectedRow = a.parentElement.parentElement;

    document.getElementById('nombre').value = selectedRow.cells[0].innerHTML;
    document.getElementById('apellido').value = selectedRow.cells[1].innerHTML;
    document.getElementById('tarea').value = selectedRow.cells[2].innerHTML;
    document.getElementById('descripcion').value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {

    selectedRow.cells[0].innerHTML = formData.nombre;
    selectedRow.cells[1].innerHTML = formData.apellido;
    selectedRow.cells[2].innerHTML = formData.tarea;
    selectedRow.cells[3].innerHTML = formData.descripcion;
}



