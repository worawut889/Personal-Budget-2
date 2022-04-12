const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send({title: 'Hello world'})
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('App is running on port ' + port)
})