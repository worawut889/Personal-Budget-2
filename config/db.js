require("dotenv").config({path: './config/.env'});

const { Pool } = require("pg");

const options = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

console.log(process.env)

const db = new Pool(options);

module.exports = { db };