const hash = require('./hash')

module.exports = {
  secret: process.env.APP_SECRET || hash,
  ttl: 86400
}
