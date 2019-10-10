/**
 * @fileOverview lokijs database instance
 * @requires ../cfg,../server,../dbg

 */

/**
 * Provides client & server side in-memory database system.
 * @external {LokiJs}
 * @see {@link https://github.com/techfort/LokiJS}
 */
const LokiJs = require('lokijs')
/** @ignore */
// const LokiJsFsStructuredAdapter = require('lokijs/src/loki-fs-structured-adapter')
/** @ignore */
// const lfsAdapter = new LokiJsFsStructuredAdapter()
/** @ignore */
const cfg = require('../cfg')
/** @ignore */
const evt = require('../server')
/** @ignore */
const dbg = require('../dbg').extend('data:base')
/**
 * Represent the loading process.
 * _For internal use._
 * @property {function} onAutosave A handler that will resolve the promise on call.
 * @property {function} onAutoload A handler that will resolve the promise on call.
 * @property {Promise} promise The promise that we'll either load or save.
 * @memberof pixeldeck.data.base
 * @protected
 */
class BaseLoading {
  constructor () {
    this.finished = false
    /**
     * The loading that was promised.
     * @type {Promise}
     */
    this.promise = new Promise((resolve, reject) => {
      /**
       * This will resolve the promise.
       * @method pixeldeck.data.base.BaseLoading#onAutoload
       */
      this.onAutoload = function onAutoload () {
        /**
         * Loaded fires when database auto loads
         * @event pixeldeck.server#Loaded
         */
        evt.emit('Loaded')
        dbg('onAutoload', ...arguments)
        loading.finished = true
        resolve()
      }
      /**
       * This will resolve the promise.
       * @method pixeldeck.data.base.BaseLoading#onAutosave
       */
      this.onAutosave = function onAutosave () {
        /**
         * Saved fires when database auto saves
         * @todo Maybe this should be in a more general on save handler?
         * @event pixeldeck.server#Saved
         */
        evt.emit('Saved')
        dbg('onAutosave', ...arguments)
        loading.finished = true
        resolve()
      }
    })
    return this
  }
}
/**
 * this object contains a promise and associated callback handlers
 * @todo Review this solution for `promise-ify-ing`
 * @memberof pixeldeck.data.base
 * @type {pixeldeck.data.base.BaseLoading}
 */
const loading = new BaseLoading()
/**
 * instance of a [loki.js](https://github.com/techfort/LokiJS) embedded database
 * @namespace pixeldeck.data.base
 * @type {object}
 */
const base = module.exports = new LokiJs(cfg.dbName, Object.assign({
  persistenceMethod: 'fs-storage',
  autoloadCallback: loading.onAutoload,
  autosaveCallback: loading.onAutosave
}, cfg.dbOpts))
// export said loading as documented
base.loading = loading
/**
 * handle database close event
 * @event pixeldeck.data.base#close
 */
base.on('close', () => {
  dbg('Database closed, deleting this module from cache:', __filename)
  delete require.cache[__filename]
})

dbg('loading...')
