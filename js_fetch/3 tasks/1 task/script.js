const students = document.querySelector('.radio');
const fight_skills = document.querySelector('.fight_skills');
const inteligence = document.querySelector('.inteligence');
const work_team = document.querySelector('.work_team');
const midd_score = document.querySelector('.midd_score')

fetch('http://localhost/api/get_students')
  .then(response => response.json())
  .then(data => {
    let html = '';
    data.forEach(student => {
      html += `<input id="${student.name}" type="radio" name="student"> <label for="${student.name}">${student.name} ${student.surname}</label>`;
    });
    students.innerHTML = html;
    
    const radioButtons = document.querySelectorAll('.radio input[type="radio"]');
    radioButtons.forEach(button => {
      button.addEventListener('change', () => {
        const selectedStudent = data.find(student => student.name === button.id);
        console.log(selectedStudent,button.id)
        displaySkills(selectedStudent);
        displayScore(selectedStudent)
      });
    });
  })
  .catch(error => {
    console.error('Ошибка при получении данных:', error);
  });

function displayScore(student){
  console.log( student.fight_skills + student.inteligence + student.work_team); 
}
displayScore()
function displaySkills(student) {
    console.table(student);
  if (student) {
    fight_skills.textContent = `${student.fight_skills}`
    inteligence.textContent = `${student.inteligence}`
    work_team.textContent = `${student.work_team}`
    midd_score.textContent = ``
  } else {
    fight_skills.textContent = ''
    inteligence.textContent = ''
    work_team.textContent = ''
  }
}
