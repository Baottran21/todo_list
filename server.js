//IMPORT NECESSARY MODULES
import express from 'express';
import dotenv from 'dotenv';
import pkg from 'pg';
import cors from 'cors';
//NECESSARY MIDDLEWARE
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

dotenv.config();
const databaseURL = process.env.DATABASE_URL;

const { Pool } = pkg;
const pool = new Pool({
  connectionString: databaseURL,
});

// console.log(pool); //Connection Pool is working locally

//GET ALL
app.get('/todos', async (_, res) => {
  try {
    await pool.query(`SELECT * FROM todos`);
    const sorted = await pool.query(`SELECT * FROM todos ORDER BY todo_id ASC`);
    res
      .status(200)
      .setHeader('Content-Type', 'application/json')
      .send(sorted.rows);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .setHeader('Content-Type', 'text/plain')
      .send(`INTERNAL SERVER ERROR`);
  }
});
//GET ONE
app.get('/todos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query(
      `SELECT * FROM todos WHERE todo_id = ${id}`
    );
    if (result.rowCount === 0) {
      res
        .status(404)
        .setHeader('Content-Type', 'text/plain')
        .send('TASK NOT FOUND');
      return;
    }
    res
      .status(200)
      .setHeader('Content-Type', 'application/json')
      .send(result.rows[0]);
  } catch (error) {
    res
      .status(500)
      .setHeader('Content-Type', 'text/plain')
      .send(`INTERNAL SERVER ERROR`);
  }
});
//POST ONE
app.post('/todos', async (req, res) => {
  try {
    const { todo } = req.body;
    const result = await pool.query(
      `INSERT INTO todos (todo) VALUES ('${todo}') RETURNING *;`
    );
    res
      .status(201)
      .setHeader('Content-Type', 'application/json')
      .send(result.rows[0]);
  } catch (error) {
    res
      .status(500)
      .setHeader('Content-Type', 'text/plain')
      .send(`INTERNAL SERVER ERROR`);
  }
});
//UPDATE ONE
app.patch('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { todo } = req.body;
    const result = await pool.query(
      `UPDATE todos SET todo = ('${todo}') WHERE todo_id = ${id}`
    );
    if (result.rowcount === 0) {
      res
        .status(404)
        .setHeader('Content-Type', 'text/plain')
        .send('TASK NOT FOUND');
      return;
    }
    res
      .status(201)
      .setHeader('Content-Type', 'application/json')
      .send(`Changed Task successfully}`);
  } catch (error) {
    res
      .status(500)
      .setHeader('Content-Type', 'text/plain')
      .send(`INTERNAL SERVER ERROR`);
  }
});
//DELETE ONE
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`DELETE FROM todos WHERE todo_id = ${id}`);
    if (result.rowCount === 0) {
      res
        .status(404)
        .setHeader('Content-Type', 'text/plain')
        .send('TASK NOT FOUND');
      return;
    }
    res
      .status(200)
      .setHeader('Content-Type', 'application/json')
      .send('Task Has Been Deleted');
  } catch (error) {
    res
      .status(500)
      .setHeader('Content-Type', 'text/plain')
      .send(`INTERNAL SERVER ERROR`);
  }
});

//LISTENING ON PORT
app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
});
