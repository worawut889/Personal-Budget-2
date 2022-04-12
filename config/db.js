require("dotenv").config({path: './config/.env'});

const { Pool } = require("pg");

const options = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const pool = new Pool(options);

pool.query('SELECT * FROM envelops', (err, result) => {
  console.log(process.env)
  console.log(result.rows)
})

module.exports = { pool };