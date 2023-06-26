const url = `https://buildatodo.onrender.com`;

window.addEventListener('load', async () => {
  await getAll();
});

//GET ALL
const getAll = async () => {
  try {
    const response = await fetch(`$url/todos`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
