const cfg = require('./cfg')
const Repl = require('repl')
const repl = module.exports = Repl.start(cfg.replPrompt, cfg.replOpts)
const dbg = require('./dbg').extend('repl')
repl.on('close', function () {
  dbg('closing....')
  require('./close')();
});