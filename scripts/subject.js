console.clear();

let modal = document.getElementById('modal');
let overlay = document.getElementById('overlay');
let closeBtn = document.getElementById('btn-close');
let selectBtn = Array.from(document.getElementsByClassName('btn-select'));

// ! Estos valores deben ser dinamicos con los datos dxe la BD
let subjName, subjId, subjCredits;

// ACTUALIZAR LA INFORMACION DE LAS OPCIONES DE MATERIAS
// El objetivo es cargar correctamente las funciones asociadas cada que se actualizan las opciones
function updateData() {
    let subjects = Array.from(document.getElementsByClassName('subj'));
    console.log(subjects)
    subjects.forEach(subj => subj.addEventListener('click', e => {
        subjName = e.target.children[0].innerText;
        subjId = e.target.getAttribute("id");
        subjCredits = 10;

        openModal();
    }))
}
// Enseguida se llama a la funcion para la primera vez que se ejecuta el JS
updateData();

// ABRIR EL MODAL CON LOS DETALLES DE LA MATERIA
function openModal() {
    let subjNameModal = document.getElementById('nombreMatModal');
    let subjIdModal = document.getElementById('claveMatModal');
    let subjCreditsModal = document.getElementById('creditosMatModal');

    // No se necesitan como parametro, son var. globales
    subjNameModal.innerText = subjName;
    subjIdModal.innerText = subjId;
    subjCreditsModal.innerText = subjCredits;

    overlay.style.display = 'block';
    modal.style.display = 'block';
}

// EVENTO PARA EL BOTON DE SELECCIONAR EN EL MODAL DE LA MATERIA
selectBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {

        // Creacion del objeto de la materia
        // Se crea a partir de los detalles del modal
        let subject = {
            id: subjId,
            name: subjName,

            teacher: e.target.parentNode.children[0].innerText,
            hour: e.target.parentNode.children[1].innerText,
            classroom: e.target.parentNode.children[2].innerText,
            group: e.target.parentNode.children[3].innerText
        }

        createOrUpdateRow(subject);
        closeModal();
    })
})

// DECIDIR SI SE CREARA UNA NUEVA FILA EN LA TABLA O SOLO SE ACTUALIZARA
function createOrUpdateRow(subject) {
    let subjectTable = document.getElementById('subjects');
    let flag = false;
    let currentRow;

    // Obtener # de filas de la tabla
    let rowsLength = subjectTable.rows.length;

    // Recorrer las filas de la tabla (excepto el header)
    for (let i = 1; i < rowsLength; i++) {
        // Obtener las celdas de cada fila

        cells = subjectTable.rows.item(i).cells;

        // Comprobar si la materia ya existe en la tabla
        // Se revisa si el id a agregar coincide con la celda "clave"
        if (subject["id"] === cells[0].innerText) {
            flag = true;
            // Se obtiene un array con las celdas de la fila para posteriormente actualizarla
            currentRow = Array.from(cells);
        }
    }

    // Si la materia ya existe, actualizarla
    // De lo contrario, agregar una nueva fila
    flag ? updateRow(subject, currentRow) : addNewRow(subjectTable, subject);;
}

// ACTUALIZAR MATERIA EN LA TABLA
function updateRow(subject, row) {
    // Actualizar hora
    row[2].innerText = subject["hour"];

    // Actualizar salon
    row[3].innerText = subject["classroom"];

    // Actualizar grupo
    row[4].innerText = subject["group"];
}

// AGREGAR NUEVA MATERIA A LA TABLA
function addNewRow(table, subject) {
    // Obtener ultima fila
    let newSubjectRow = table.insertRow(-1);

    // Agregar atributo personalizado con la clave
    newSubjectRow.setAttribute('data-subject-id', subject["id"]);

    // Agregar cada celda
    insertCellTable(newSubjectRow, subject["id"]);
    insertCellTable(newSubjectRow, subject["name"]);
    insertCellTable(newSubjectRow, subject["teacher"]);
    insertCellTable(newSubjectRow, subject["group"]);
    insertCellTable(newSubjectRow, subject["classroom"]);
    insertCellTable(newSubjectRow, subject["hour"]);

    // Agregar nueva celda con las acciones (editar, borrar)
    insertActionsCell(subject, newSubjectRow);

    showHideSubmit();
}

// INSERTAR CONTENIDO A LA CELDA DE LA NUEVA MATERIA EN LA TABLA

function insertCellTable(newSubjectRow, subject) {
    let newSubjectCell = newSubjectRow.insertCell(-1);
    newSubjectCell.textContent = subject;
}

// AGREGAR CELDA DE OPCIONES (EDITAR, BORRAR) EN LA MATERIA AGREGADA A LA TABLA
function insertActionsCell(subject, newSubjectRow) {
    // Crear nueva celda
    let actionsCell = newSubjectRow.insertCell(-1);

    // Crear boton de 'Editar'
    let btnEdit = document.createElement('button');
    let editContent = document.createTextNode('Editar');

    btnEdit.appendChild(editContent);
    btnEdit.setAttribute('class', 'btn btn-edit');

    // Crear boton de 'Eliminar'
    let btnRemove = document.createElement('button');
    let removeContent = document.createTextNode('Quitar');

    btnRemove.appendChild(removeContent);
    btnRemove.setAttribute('class', 'btn btn-remove');

    // Agregar botones a la nueva celda
    actionsCell.appendChild(btnEdit);
    actionsCell.appendChild(btnRemove);

    // Acciones cuando se edite la materia
    btnEdit.addEventListener('click', e => {
        // Obtener id con los datos de la fila, en la celda 0 -> 'Clave'
        subjId = e.target.parentNode.parentNode.children[0].innerText;

        // Obtener nombre con los datos de la fila, en la celda 1 -> 'Materia'
        subjName = e.target.parentNode.parentNode.children[1].innerText;

        // Abrir el modal con el nombre y id de la materia
        openModal(subjName, subjId);
    })

    // Acciones cuando se elimine la materia
    btnRemove.addEventListener('click', e => {
        // Remover la materia de la tabla
        removeRowTable(e);
        // Agregar la materia eliminada a las opciones de materias
        addSubjectNode(subject["id"], subject["name"]);
    })

    // Eliminar la materia de las opciones de materias con el id
    removeSubjectNode(window.subjId);
}

// ELIMINAR MATERIA DE LA TABLA
function removeRowTable(e) {
    e.target.parentNode.parentNode.remove();

    showHideSubmit();
}

// AGREGAR MATERIA ELIMINADA DE LA TABLA A LAS OPCIONES DE MATERIAS
function addSubjectNode(id, name) {
    let subjects = Array.from(document.getElementsByClassName('materias'));

    // Crear el nodo de la materia
    let subjNode = document.createElement('button');
    subjNode.setAttribute('class', 'subj');
    subjNode.setAttribute('id', id);

    let subjName = document.createElement('p');
    subjName.innerText = name;

    let subjId = document.createElement('p');
    subjId.innerText = id;

    // Agregar nombre y id al nodo
    subjNode.appendChild(subjName);
    subjNode.appendChild(subjId);

    // Agregar nuevo nodo a las opciones de materias
    subjects[0].appendChild(subjNode);

    // Cargar las funciones asociadas al nuevo nodo de opciones de materias
    updateData();
}

// REMOVER MATERIA ESCOGIDA DE LAS OPCIONES DE MATERIAS
function removeSubjectNode(id) {
    //! Puede mejorarse al buscar solo en las materias del semestre y no en todas
    let subjects = Array.from(document.getElementsByClassName('materias'));

    // Buscar la materia en las opciones de materias
    subjects.forEach(subj => (Array.from(subj.children).forEach(subj => {
        // Comparamos el id de la materia escogida con los ids de las opc de materias
        if (id === subj.getAttribute("id")) {
            subj.remove();
        }
    })))
}

// CERRAR EL MODAL
closeBtn.addEventListener('click', () => {
    closeModal();
})

function closeModal() {
    overlay.style.display = 'none';
    modal.style.display = 'none';
}


function showHideSubmit() {
    let btnSubmit = document.getElementById('btn-submit');
    let table = document.getElementById('subjects');

    // Obtener # de filas de la tabla
    let rowsLength = table.rows.length;

    if (rowsLength > 2) btnSubmit.style.display = 'block';
    else btnSubmit.style.display = 'none';
}