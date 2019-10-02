const LokiJs = require('lokijs')
const LokiJsFsStructuredAdapter = require('lokijs/src/loki-fs-structured-adapter')
const lfsAdapter = new LokiJsFsStructuredAdapter()
const cfg = require('../cfg')
const evt = require('../evt')
const dbg = require('../dbg').extend('data:base')
/**
 * instance of a [loki.js](https://github.com/techfort/LokiJS) embedded database instance
 */
const base = module.exports = new LokiJs(cfg.dbName, Object.assign({
  adapter: lfsAdapter,
  autoloadCallback: onAutoload,
  autosaveCallback: onAutosave
}, cfg.dbOpts))
base.on('close',()=>{
  dbg('Database closed, deleting this module from cache:',__filename)
  delete require.cache[__filename]
})


function onAutoload(){
  evt.emit('Loaded')
  dbg('onAutoload',...arguments)
}

function onAutosave(){
  dbg('onAutosave',...arguments)
}
