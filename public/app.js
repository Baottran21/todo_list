const url = `https://buildatodo.onrender.com`;

window.addEventListener('load', () => {
  getAll();
});

//GET ALL
async function getAll() {
  try {
    const response = await fetch(`$url/todos`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors',
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
