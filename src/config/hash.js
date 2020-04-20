const crypto = require('crypto')

module.exports = crypto.createHash('md5').update('some_string').digest('hex')
