const https = require("https");
const http = require("http");
const { readFileSync } = require("fs");
const app = require("./app");

var key = readFileSync(__dirname + "/../../client-key.key");
var cert = readFileSync(__dirname + "/../../cclient-cert.crt");
var options = {
  key: key,
  cert: cert
};

let { PORT, HTTPS, NODE_ENV } = process.env;

NODE_ENV &&
  https.createServer(options, app).listen(HTTPS || 3000, () => {
    console.log(`https Server is up  ${HTTPS || 3000}`);
  });

http.createServer(app).listen(PORT || 8080, () => {
  console.log(`http  Server is up  on the port ${PORT || 8080}`);
});
