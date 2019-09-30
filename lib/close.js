
module.exports = close
const dbg = require('./dbg').extend('close')
/**
 * Shutdown the pixeldeck service
 */
async function close () {
  return new Promise((resolve, reject) => {
    const server = require('./server')
    dbg('close requested')
    dbg('server shutdown')
    server.close(function onServerShutdown (err) {
      if (err) {
        dbg('error closing because %o', err)
        return resolve()
      } else {
        dbg('server reports closed')
        return resolve()
      }
    })//end function
  }).finally(() => {
    dbg('asking repl to close')
    return require('./repl').close()
  }).finally(() => {
    dbg('asking data.base to close')
    require('./data/base').close()
  }).catch((reason) => {
    dbg('Error: %O', reason);
    process.exit(-1)
  })
}