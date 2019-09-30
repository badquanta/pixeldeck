module.exports = repl
repl.close = replClose
repl.log = replLog
const cfg = require('./cfg')
const Repl = require('repl')
//const streamBuffers = require('stream-buffers')
//const outBuffer = new streamBuffers.WritableStreamBuffer()
//const inBuffer = new streamBuffers.ReadableStreamBuffer()
//process.stdout.pipe(outBuffer)
//inBuffer.pipe(process.stdin)
const dbg = require('./dbg').extend('repl')
/**
 * @name repl
 * Boot up a service repl so we can interact/debug/admin the server-side.
 * @param {*} opts
 * @param  {...any} args
 * @returns {repl.REPLServer}
 */
function repl (opts = {}, ...args) {
  if (!cfg.interactive){
    dbg('INTERACTIVE REPL DISABLED')
    return
  }
  if (repl.server && !repl.closing) {
    dbg('repl server already started')
    return repl.server
  }
  const finalReplOpts = Object.assign({}, opts, cfg.replOpts)
  dbg('starting repl(%o , %O)', opts, ...args)
  repl.server = Repl.start(
    finalReplOpts, ...args
  )
  repl.server.once('close', function () {
    dbg('closing....')
    repl.closing = true;
    require('./close')()
  });
}
async function replClose () {
  dbg('repl close requested')
  clearTimeout(timeoutId)
  return new Promise((res, rej) => {
    if (!repl.server) {
      dbg('no repl server running')
      return res()
    } else {

      dbg('commanding repl server close')
      repl.server.close()
      return res()
    }
  })
}
let timeoutId = null;
const seconds = 1000;
const suspendTimeout = 0.5 * seconds;
function suspendRepl () {
  if (timeoutId) {
    //dbg('already paused')
    clearTimeout(timeoutId)
  } else {
    //dbg('pausing')
    process.stdin.pause()
    if (repl.server) {
      repl.server.pause()
      repl.server.clearLine()
      repl.server.clearBufferedCommand()
    }

  }
  timeoutId = setTimeout(restoreRepl, suspendTimeout)
}

function restoreRepl () {
  timeoutId = null;
  process.stdin.resume()
  //dbg('resuming')
  if (repl.server && repl.server.paused) {
    repl.server.prompt()
  }
}

function replLog () {
  suspendRepl()
  console.log(...arguments)

}