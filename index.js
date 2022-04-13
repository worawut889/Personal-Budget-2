const express = require('express')
const app = express()

require("dotenv").config({path: './config/.env'});


const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('App is running on port ' + port)
})