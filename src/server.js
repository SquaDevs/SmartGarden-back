const https = require('https')
const http = require('http')
const { join } = require('path')
const { readFileSync } = require('fs')
const app = require('./app')

const appHTTP = http.createServer(app)
// const io = require('socket.io')(appHTTP)
// const ws = require('./ws')
// const io = require('socket.io')(appHTTP);

const { PORT, HTTPS } = process.env

HTTPS && https
  .createServer({
    key: readFileSync(join(__dirname, '/../../client-key.pem')),
    cert: readFileSync(join(__dirname, '/../../client-cert.pem'))
  }, app)
  .listen(HTTPS, () => {
    console.log(`https Server is up  ${ HTTPS }`)
  })

PORT && appHTTP
  .listen(PORT, () => {
    console.log(`http  Server is up  on the port ${ PORT }`)
  })

// ws(io)
