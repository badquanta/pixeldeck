/**
 * @fileOverview lokijs database instance
 * @requires ../cfg,../evt,../dbg
 */

/**
 * https://github.com/techfort/LokiJS
 */
const LokiJs = require('lokijs')
/** @ignore */
// const LokiJsFsStructuredAdapter = require('lokijs/src/loki-fs-structured-adapter')
/** @ignore */
// const lfsAdapter = new LokiJsFsStructuredAdapter()
/** @ignore */
const cfg = require('../cfg')
/** @ignore */
const evt = require('../evt')
/** @ignore */
const dbg = require('../dbg').extend('data:base')
/**
 * this object contains a promise and associated callback handlers
 * @todo Review this solution for `promise-ify-ing`
 */
const load = newLoadPromise()
/**
 * instance of a [loki.js](https://github.com/techfort/LokiJS) embedded database instance
 */
const base = module.exports = new LokiJs(cfg.dbName, Object.assign({
  persistenceMethod: 'fs',
  autoloadCallback: load.onAutoload,
  autosaveCallback: load.onAutosave
}, cfg.dbOpts))

base.loaded = load.promise

base.on('close', () => {
  dbg('Database closed, deleting this module from cache:', __filename)
  delete require.cache[__filename]
})
/**
 *
 */
async function newLoadPromise () {
  const load = { finished: false }
  load.promise = new Promise(function (resolve, reject) {
    /**
     * @emit Loaded
     */
    function onAutoload () {
      if (load.finished) { throw new Error('WTF?') }
      evt.emit('Loaded')
      dbg('onAutoload', ...arguments)
      load.finished = true
      resolve()
    }
    load.onAutoload = onAutoload
    /**
     * @emits Saved
     */
    function onAutosave () {
      if (load.finished) { throw new Error('WTF? already finished?') }
      evt.emit('Saved')
      dbg('onAutosave', ...arguments)
      load.finished = true
      resolve()
    }
    load.onAutosave = onAutosave
  })
  return load
}

dbg('loading...')
