/** @ignore */
const server = require('../server')
/**
 * @external
 * @see {@link https://nodejs.org/docs/latest-v10.x/api/repl.html#repl_repl_start_options}
 */
const Repl = require('repl')
const dbg = require('../dbg').extend('ui')
/**
 * Just the module that represents our user interface
 * @namespace pixeldeck.ui
 */
// eslint-disable-next-line no-unused-vars
const ui = module.exports = {
  /**
   * start the ui
   * @param {*} opts
   * @emits 'uiStarting'
   * @emits 'uiStarted'
   * @memberof pixeldeck.ui
   */
  async Start (opts = {}) {
    const cfg = require('../cfg')
    if (!cfg.interactive) {
      dbg('User Interface Disabled')
      return Promise.resolve(null)
    }

    if (!ui.REPLServer && ui.starting) {
      dbg('User Interface Already Starting...')
    } else {
      /**
       * before any ui has be created
       * @event pixeldeck.server.uiStarting
       **/
      server.emit('uiStarting')
      dbg('Promising to start user interface...')
      ui.starting = new Promise(function (resolve, reject) {
        const finalReplOpts = Object.assign({}, opts, cfg.replOpts)
        dbg('starting repl(%o)', finalReplOpts)
        ui.REPLServer = Repl.start(finalReplOpts)
        ui.REPLServer.once('close', function () {
          dbg('on REPLServer close, closing pixeldeck too')
          require('../server/Stop')()
        })
        /**
         * after ui is ready to use
         * @event pixeldeck.server.uiStarted
         */
        server.emit('uiStarted')
        return resolve(ui)
      })
    }
    return ui.starting
  },
  /**
   * stop the ui
   * @emits 'uiStopping'
   * @emits 'uiStopped'
   * @memberof pixeldeck.ui
   */
  async Stop () {
    if (!ui.starting) {
      dbg('ui has not yet been started')
      return false
    }
    /**
     * before ui is deconstructed
     * @event pixeldeck.server.uiStopping
     */
    server.emit('uiStopping')
    dbg('repl close requested, clearing reissue prompt timeout', ui.timeoutId)
    clearTimeout(ui.timeoutId)
    dbg('commanding repl server close')
    const REPLServer = (await ui.uiStarting).REPLServer
    REPLServer.close()
    /**
     * after ui is deconstructed
     * @event pixeldeck.server.uiStopped
     */
    server.emit('uiStopped')
    return true
  }
}
