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
// const url = 'https://corsproxy.io/?' + encodeURIComponent('https://api.domain.com/...');

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
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .setHeader('Content-Type', 'application/json')
      .send(`INTERNAL SERVER ERROR: ${err.message}`);
  }
});
//GET ONE
//POST ONE
//UPDATE ONE
//DELETE ONE

//LISTENING ON PORT
app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
});
