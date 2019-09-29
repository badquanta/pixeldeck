const LokiJs = require('lokijs')
const cfg = require('./cfg')
module.exports = new LokiJs(cfg.dbName, cfg.dbOpts)