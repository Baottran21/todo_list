//IMPORT NECESSARY MODULES
import express from 'express';
import dotenv from 'dotenv';
import pkg from 'pg';
import cors from 'cors';
import { LogError } from 'concurrently';

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
app.get('/todo', async (_, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos');
    console.log(result, LogError);
  } catch (error) {
    console.log(error);
  }
});
//GET ONE
//POST ONE
//UPDATE ONE
//DELETE ONE

//LISTENING ON PORT
