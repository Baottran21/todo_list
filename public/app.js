const url = `https://buildatodo.onrender.com`;
const landingContainer = document.querySelector(`#landing-container`);
const taskContainer = document.querySelector('#task-container');

window.addEventListener('load', () => {
  getAll();
});

//DOM Elements

//GET ALL
async function getAll() {
  try {
    const response = await fetch(`${url}/todos`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors',
    });
    const data = await response.json();
    const ul = document.createElement('ul');
    taskContainer.appendChild(ul);
    for (let task of data) {
      console.log(task);
      const li = document.createElement('li');
      li.textContent = task.todo;
      ul.appendChild(li);
    }
  } catch (error) {
    console.log(error);
  }
}
