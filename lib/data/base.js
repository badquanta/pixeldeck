const LokiJs = require('lokijs')
const cfg = require('../cfg')
/**
 * instance of a [loki.js](https://github.com/techfort/LokiJS) embedded database instance
 */
const base = module.exports = new LokiJs(cfg.dbName, cfg.dbOpts)