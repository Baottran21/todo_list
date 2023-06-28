const url = `https://buildatodo.onrender.com`;
const taskContainer = document.querySelector('#task-container');

window.addEventListener('load', () => {
  getAll();
});

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
    console.log(taskContainer.firstChild.childNodes);
  } catch (error) {
    console.log(error);
  }
}
