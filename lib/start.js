module.exports = start
const dbg = require('./dbg').extend('start')
/**
 * initialize pixeldeck services
 */
function start () {
  const cfg = require('./cfg')
  const server = require('./server')
  server.listen(4444, function () {
    dbg('listening')

    if (cfg.interactive) {
      const repl = require('./repl')
      repl()
      Object.defineProperties(repl.server.context, {
        pixeldeck: { get: () => require('./root') },
        db: { get: () => require('./db') },
        server: { get: () => require('./server') },
        Tileset: { get: () => require('./Tileset') },
        repl: { get: () => require('./repl') }
      })
    }

  })

}