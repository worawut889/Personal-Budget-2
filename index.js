const express = require('express')
const db = require('./config/db')
const app = express()

require("dotenv").config({path: './config/.env'});

app.get('/', async (req, res) => {


})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('App is running on port ' + port)
})