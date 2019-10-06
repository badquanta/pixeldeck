module.exports = Stop
/** @ignore */
const dbg = require('../dbg').extend('ui:Stop')
/** @ignore */
const evt = require('../evt')
/**
 * Stop REPLServer
 * @emits {evt} uiStopping
 * @emits {evt} uiStopped
 */
async function Stop () {
  const ui = require('./')
  if (!ui.starting) {
    dbg('ui has not yet been started')
    return false
  }
  evt.emit('uiStopping')
  dbg('repl close requested, clearing reissue prompt timeout', ui.timeoutId)
  clearTimeout(ui.timeoutId)
  dbg('commanding repl server close')
  const server = (await ui.starting).REPLServer
  server.close()
  return true
}
