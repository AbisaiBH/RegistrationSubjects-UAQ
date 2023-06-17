let subjects = Array.from(document.getElementsByClassName('subj'));

let modal = document.getElementById('modal');
let closeBtn = document.getElementById('btn-close');

let selectBtn = Array.from(document.getElementsByClassName('btn-select'));

subjects.forEach(subj => {
    subj.addEventListener('click', (e) => {
        modal.style.display = 'block';

        // console.log(e.target.getAttribute("id"))
        let subjName = e.target.children[0].innerText;
        window.subjName = subjName;
    })
})

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
})

selectBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {

        let subject = {
            id: 1,
            name: window.subjName,
            teacher: e.target.parentNode.children[0].innerText,
            hour: e.target.parentNode.children[1].innerText,
            classroom: e.target.parentNode.children[2].innerText, 
            group: e.target.parentNode.children[3].innerText
        }

        console.log(subject);
        renderSubject(subject)
    })
})

function renderSubject(subject) {
    let subjectTable = document.getElementById('subjects');

    let newSubjectRow = subjectTable.insertRow(-1);

    newSubjectRow.setAttribute('data-subject-id',subject["subjectId"]);

    insertCellTable(newSubjectRow,subject["id"]);
    insertCellTable(newSubjectRow,subject["name"]);
    insertCellTable(newSubjectRow,subject["hour"]);
    insertCellTable(newSubjectRow,subject["classroom"]);
    insertCellTable(newSubjectRow,subject["group"]);
}

function insertCellTable(newSubjectRow,subject){
    let newSubjectCell = newSubjectRow.insertCell(-1);
    newSubjectCell.textContent = subject;
}