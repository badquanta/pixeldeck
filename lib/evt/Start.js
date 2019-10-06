/** @ignore */
const dbg = require('../dbg').extend('Start')
module.exports = Start
/**
 * Start the service, meaning:
 * 0) Open databases
 * 1) Open Http services.
 * @fires Starting
 * @fires Started
 */
async function Start () {
  const evt = require('../evt')
  evt.emit('Starting')
  const dbg = require('../dbg').extend('Start')
  const cfg = require('../cfg')
  const server = require('../server')
  await server.listen(cfg.server.port, cfg.server.address)
  dbg('listening', server.address())
  if (cfg.interactive) {
    const repl = require('../../ARCHIVES/repl')
    repl()
    require('../arch').defineRequires(require('path').resolve(__dirname, '..'), repl.server.context, 'arch', 'data', 'service', 'cfg', 'repl', 'server')
  }
  evt.emit('Start')
}
dbg('loaded')
