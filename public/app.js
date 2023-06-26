const url = `https://buildatodo.onrender.com`;

window.addEventListener('load', () => {
  getAll();
});

//GET ALL
const getAll = async () => {
  try {
    const response = await fetch(`$url/todos`);
    const data = respons.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
