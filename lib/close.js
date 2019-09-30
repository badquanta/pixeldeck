
module.exports = close
const dbg = require('./dbg').extend('close')
/**
 * Shutdown the pixeldeck service
 */
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
    return require('./repl').close()
  }).finally(() => {
    return new Promise((res, rej) => require('./data/base').close((err) => { err ? rej(err) : res() }))
  }).catch((reason) => {
    dbg('Error: %O',reason);
    process.exit(-1)
  })
}