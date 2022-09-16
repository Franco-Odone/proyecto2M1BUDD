// Variables fuera de funciones

let selectedRow = null;
let tareas = [];

// Para 'evitar' que se eliminen los datos de la tabla de datos al hacer refresh.
updateAfterPageRefresh();

// Funciones

function onSubmitForm() {

    let data = readForm();
    if (selectedRow === null) {

        insertNewRecord(data);
    } else {

        updateRecord(data);
    };
};

function readForm() {
    // Se construye el objeto.
    const formData = {};

    formData['nombre'] = document.getElementById('nombre').value;
    formData['apellido'] = document.getElementById('apellido').value;
    formData['tarea'] = document.getElementById('tarea').value;
    formData['descripcion'] = document.getElementById('descripcion').value;

    return formData;
};

function insertNewRecord(data) {
    // table va a ser igual a la etiqueta tbody
    let table = document.getElementById('listaTareas').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();

    newRow.insertCell(0).innerHTML = data.nombre;
    newRow.insertCell(1).innerHTML = data.apellido;
    newRow.insertCell(2).innerHTML = data.tarea;
    newRow.insertCell(3).innerHTML = data.descripcion;

    // Se insertan los elementos que van a ser los botones de Edit y Delete, con sus respectivos eventos.
    newRow.insertCell(4).innerHTML =
    `<button type="button" onClick=editForm(this)>Editar</button>
    <button type="button" onClick=deleteRecord(this)>Eliminar</button>`;

    // Para agregar los datos de los inputs (data) al array tareas.
    tareas.push(data)

    // Se vuelve el array un string para que se guarde asi en el localStorage.
    localStorage.setItem('dataTareas', JSON.stringify(tareas));
};

function deleteRecord(button) {

    // Son dos parentElement porque con el primero se obtiene el padre de <button></button> que es un <td></td>, y con el otro el padre de este que es el tr que necesito.
    let row = button.parentElement.parentElement;

    Swal.fire({
        title: 'Confirme si desea eliminar esta tarea',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
      }).then((result) => {

        if (result.isConfirmed) {
            Swal.fire('Tarea eliminada', '', 'success');

            // rowIndex entrega el indice del tr que se quiere eliminar.        
            tareas.splice((row.rowIndex - 1), 1);

            localStorage.setItem('dataTareas', JSON.stringify(tareas));
            document.getElementById('listaTareas').deleteRow(row.rowIndex);
        }
      });
};

function editForm(button) {

    selectedRow = button.parentElement.parentElement;

    document.getElementById('nombre').value = selectedRow.cells[0].innerHTML;
    document.getElementById('apellido').value = selectedRow.cells[1].innerHTML;
    document.getElementById('tarea').value = selectedRow.cells[2].innerHTML;
    document.getElementById('descripcion').value = selectedRow.cells[3].innerHTML;
}

function updateRecord(data) {

    selectedRow.cells[0].innerHTML = data.nombre;
    selectedRow.cells[1].innerHTML = data.apellido;
    selectedRow.cells[2].innerHTML = data.tarea;
    selectedRow.cells[3].innerHTML = data.descripcion;

    tareas.splice((selectedRow.rowIndex - 1), 1, {
        nombre: data.nombre, 
        apellido: data.apellido, 
        tarea: data.tarea, 
        descripcion: data.descripcion 
    });
    localStorage.setItem('dataTareas', JSON.stringify(tareas));
}

function updateAfterPageRefresh() {

    if (localStorage.getItem('dataTareas') === null) {

        void(0);
    } else {
        // Al obtener de vuelta el value del key, se parsea para que deje de ser un string y vuelva a ser un array.
        tareas = JSON.parse(localStorage.getItem('dataTareas'));

        for (let index = 0; index < tareas.length; index++) {

            let nombre = tareas[index].nombre;
            let apellido = tareas[index].apellido;
            let tarea = tareas[index].tarea;
            let descripcion = tareas[index].descripcion;

            document.querySelector('#tbody').innerHTML +=
            `<tr>
                <td>${nombre}</td>
                <td>${apellido}</td>
                <td>${tarea}</td>
                <td>${descripcion}</td>
                <td>
                    <button type="button" onClick=editForm(this)>Editar</button>
                    <button type="button" onClick=deleteRecord(this)>Eliminar</button>
                </td>
            </tr>
            `;
        };
    };
}

// EventListeners

document.querySelector('form').addEventListener('submit', (e) => {

    e.preventDefault();
    onSubmitForm();
    document.querySelector('form').reset();

    // Se vuelve a definir la variable que selecciona la fila deseada como null para que se pueda volver a usar.
    selectedRow = null;
});
