const express = require('express')
const fs = require('fs')

class Server {
  constructor () {
    this.port = 8001
    this.app = express()
  }

  setStatic () {
    this.app.use(
        express.static(
            __dirname + '/../' + process.env.STATIC
        )
    )
  }

  setRoute () {
    this.app.get('/', (req, res) => {
      const regExp = new RegExp('([\s\.\/]*?'+ process.env.SCRIPT +'){1}(?=/)', 'g')

      // read content and alter path to final app file afterwards
      let data = fs.readFileSync(__dirname + process.env.FILE)
      data = String(data).replace(regExp, '')

      res.send(data)
    })
  }

  startUp () {
    return new Promise((resolve, reject) => {
      if (this.server) {
        reject(new Error('Server is already running!'))
      } else {
        this.server = this.app.listen(this.port, () =>
          resolve('App listening on port', this.port)
        )
      }
    })
  }

  tearDown () {
    this.server.close()
    this.server = undefined
  }
}

module.exports.Server = Server
