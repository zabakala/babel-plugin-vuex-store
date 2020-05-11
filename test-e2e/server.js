const express = require('express')
const fs = require('fs')

// app setup
const app = express()

app.use(
  express.static(
    __dirname + '/../' + process.env.TARGET_DIR
  )
)

// app port
const port = 8001

// route
app.get('/', (req, res) => {
  // read content and alter path to final app file
  let data = fs.readFileSync(__dirname + process.env.URL)
  data = String(data).replace(new RegExp('(\.\.\/)*' + process.env.TARGET_DIR), '')

  res.send(data)
})

// listener
app.listen(port, () => {
  console.log('App listening on port', port)
})
