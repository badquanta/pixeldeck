module.exports = start
const dbg = require('./dbg').extend('start')
function start () {
  const dbg = require('./dbg')
  const server = require('./server')
  server.listen(4444, function () {
    dbg('listening')
    const repl = require('./repl')
    Object.defineProperties(repl.context, {
      pixeldeck: { get: () => require('./root') },
      db: { get: () => require('./db') },
      server: { get: () => require('./server') },
      Tileset: { get: () => require('./Tileset') }
    })
  })

}