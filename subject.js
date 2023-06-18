console.clear()

updateData();

function updateData() {
    let subjects = Array.from(document.getElementsByClassName('subj'));
    subjects.forEach(subj => subj.addEventListener('click', e => {
        let subjName = e.target.children[0].innerText;
        window.subjName = subjName;
    
        let subjId = e.target.getAttribute("id");
        window.subjId = subjId;

        openModal(subjName, subjId);
    }))   
}

let modal = document.getElementById('modal');
let closeBtn = document.getElementById('btn-close');

let selectBtn = Array.from(document.getElementsByClassName('btn-select'));

function openModal(subjName, subjId) {
    let subjNameModal = document.getElementById('nombreMatModal');
    let subjIdModal = document.getElementById('claveMatModal');

    subjNameModal.innerText = subjName;
    subjIdModal.innerText = subjId;

    modal.style.display = 'block';
}

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
})

selectBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {

        let subject = {
            id: window.subjId,
            name: window.subjName,
            teacher: e.target.parentNode.children[0].innerText,
            hour: e.target.parentNode.children[1].innerText,
            classroom: e.target.parentNode.children[2].innerText,
            group: e.target.parentNode.children[3].innerText
        }

        renderSubject(subject)
    })
})

function renderSubject(subject) {
    let subjectTable = document.getElementById('subjects');
    let flag = false;
    let currentRow;

    let rowsLength = subjectTable.rows.length;

    for (let i = 1; i < rowsLength; i++) {
        cells = subjectTable.rows.item(i).cells;

        if(subject["id"] === cells[0].innerText) {
            flag = true;
            currentRow = Array.from(cells);
        }
    }

    flag ? updateRow(subject, currentRow) : addNewRow(subjectTable, subject);;
}

function updateRow(subject, row) {
    // Update hour
    row[2].innerText = subject["hour"];

    // Update classroom
    row[3].innerText = subject["classroom"];

    // Update group
    row[4].innerText = subject["group"];
}

function addNewRow(table, subject) {
    let newSubjectRow = table.insertRow(-1);

    newSubjectRow.setAttribute('data-subject-id', subject["id"]);

    insertCellTable(newSubjectRow, subject["id"]);
    insertCellTable(newSubjectRow, subject["name"]);
    insertCellTable(newSubjectRow, subject["hour"]);
    insertCellTable(newSubjectRow, subject["classroom"]);
    insertCellTable(newSubjectRow, subject["group"]);

    let actionsCell = newSubjectRow.insertCell(5);


    let btnRemove = document.createElement('button');
    let removeContent = document.createTextNode('Quitar');

    let btnEdit = document.createElement('button');
    let editContent = document.createTextNode('Editar');

    btnEdit.appendChild(editContent);
    btnEdit.setAttribute('class', 'btn-edit');

    btnRemove.appendChild(removeContent);
    btnRemove.setAttribute('class', 'btn-remove');
    
    actionsCell.appendChild(btnEdit);
    actionsCell.appendChild(btnRemove);

    btnEdit.addEventListener('click', e => {
        subjId = e.target.parentNode.parentNode.children[0].innerText;
        subjName = e.target.parentNode.parentNode.children[1].innerText;

        openModal(subjName, subjId);
    })

    btnRemove.addEventListener('click', e => {
        removeCellTable(e);
        addSubjectNode(subject["id"], subject["name"]);
    })

    removeSubjectNode(window.subjId);
}

function insertCellTable(newSubjectRow, subject) {
    let newSubjectCell = newSubjectRow.insertCell(-1);
    newSubjectCell.textContent = subject;
}

function removeCellTable(e) {
    e.target.parentNode.parentNode.remove();
}

function addSubjectNode(id, name) {
    let subjects = Array.from(document.getElementsByClassName('materias'));

    let subjNode = document.createElement('button');
    subjNode.setAttribute('class', 'subj');
    subjNode.setAttribute('id', id);

    let subjName = document.createElement('p');
    subjName.innerText = name;

    let subjId = document.createElement('p');
    subjId.innerText = id;

    subjNode.appendChild(subjName);
    subjNode.appendChild(subjId);

    subjects[0].appendChild(subjNode);

    updateData();
}

function removeSubjectNode(id) {
    let subjects = Array.from(document.getElementsByClassName('materias'));

    subjects.forEach(subj => (Array.from(subj.children).forEach(subj => {
        if (id === subj.getAttribute("id")) {
            subj.remove();
        }
    })))
}