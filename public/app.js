const url = `https://buildatodo.onrender.com`;
const landingContainer = document.querySelector(`#landing-container`);
const taskContainer = document.querySelector('#task-container');

window.addEventListener('load', () => {
  getAll();
  createHeader();
  createFooter();
});

//DOM Elements
function createHeader() {
  const header = document.createElement('header');
  const headingText = document.createElement('h1');
  landingContainer.appendChild(header);
  headingText.textContent = 'Your Daily To-dos';
  header.appendChild(headingText);
}

function createFooter() {
  const footer = document.createElement('footer');
  const footerText = document.createElement('h2');
  landingContainer.appendChild(footer);
  footerText.textContent = 'CopyRights @ Bao Tran';
  header.appendChild(footerText);
}

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
