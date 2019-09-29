module.exports = close
const dbg = require('./dbg').extend('close')
async function close () {
  return new Promise((resolve, reject) => {
    const server = require('./server')
    if (server.listening) {
      dbg('server shutdown')
      server.close(function onServerShutdown (err) {
        if (err) {
          dbg.error(err)
          reject(err)
        } else {
          resolve()
        }
      })
    }
  }).finally(() => {
    const repl = require('./repl')
    repl.close()
  }).finally(() => {
    return new Promise((res, rej) => require('./db').close((err) => { err ? rej(err) : res() }))
  }).catch((reason) => {
    dbg.error(reason);
    process.exit(-1)
  })
}