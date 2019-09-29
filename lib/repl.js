const cfg = require('./cfg')
const Repl = require('repl')
//const streamBuffers = require('stream-buffers')
//const outBuffer = new streamBuffers.WritableStreamBuffer()
//const inBuffer = new streamBuffers.ReadableStreamBuffer()
//process.stdout.pipe(outBuffer)
//inBuffer.pipe(process.stdin)
const repl = module.exports = Repl.start(Object.assign({ },  cfg.replOpts))
const dbg = require('./dbg').extend('repl')
repl.on('close', function () {
  dbg('closing....')
  require('./close')();
});