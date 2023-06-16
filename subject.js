let subjects = document.getElementsByClassName('subj');
let subjectsArr = Array.from(subjects);

let modal = document.getElementById('modal');
let closeBtn = document.getElementById('btn-close');

subjectsArr.forEach(subj => {
    subj.addEventListener('click', () => {
        modal.style.display = 'block';
    })
})

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
})