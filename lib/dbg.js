/**
 * `debug` provides our output
 * @namespace dbg
 * @kind instance
 * @see {@link https://www.npmjs.com/package/debug}
 */
// eslint-disable-next-line no-unused-vars
const dbg = module.exports = require('debug')(require('../package.json').name)
const oldLog = require('debug').log
require('debug').log = function specialLog () {
  require('readline').cursorTo(process.stdout, 0)
  require('readline').clearLine(process.stdout)
  const res = oldLog(...arguments)
  if (require('./ui').REPLServer) {
    require('./ui').REPLServer.prompt()
  }
  return res
}
