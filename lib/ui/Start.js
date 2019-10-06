module.exports = Start
/**
 * https://nodejs.org/docs/latest-v10.x/api/repl.html
 * @private
 */
const Repl = require('repl')
/** @ignore */
const dbg = require('../dbg').extend('ui:Start')
/** @ignore */
const evt = require('../evt')
/**
 * Start the user interface
 * @emits {evt} uiStarting
 * @emits {evt} uiStarted
 * @todo Debug more events
 */
async function Start (opts = {}) {
  const cfg = require('../cfg')
  if (!cfg.interactive) {
    dbg('User Interface Disabled')
    return Promise.resolve(null)
  }
  const ui = require('.')
  if (!ui.REPLServer && ui.starting) {
    dbg('User Interface Already Starting...')
  } else {
    evt.emit('uiStarting')
    dbg('Promising to start user interface...')
    ui.starting = new Promise(function (resolve, reject) {
      const finalReplOpts = Object.assign({}, opts, cfg.replOpts)
      dbg('starting repl(%o)', finalReplOpts)
      ui.REPLServer = Repl.start(finalReplOpts)
      ui.REPLServer.once('close', function () {
        dbg('on REPLServer close, closing pixeldeck too')
        require('../evt/Stop')()
      })
      evt.emit('uiStarted')
      return resolve(ui)
    })
  }
  return ui.starting
}
