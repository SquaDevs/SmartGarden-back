const https = require("https");
const http = require("http");
const { readFileSync } = require("fs");
const app = require("./app");

let { PORT, HTTPS } = process.env;
if (HTTPS) {
  var key = readFileSync(__dirname + "/../../client-key.pem");
  var cert = readFileSync(__dirname + "/../../client-cert.pem");
  var options = {
    key: key,
    cert: cert
  };

  https.createServer(options, app).listen(HTTPS || 3000, () => {
    console.log(`https Server is up  ${HTTPS || 3000}`);
  });
}
http.createServer(app).listen(PORT || 8080, () => {
  console.log(`http  Server is up  on the port ${PORT || 8080}`);
});
