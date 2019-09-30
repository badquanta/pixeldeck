const dbg = module.exports = require('debug')(require('../package.json').name)
dbg.log = require('./repl').log

