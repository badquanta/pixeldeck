#!/usr/bin/env node
const pixeldeck = module.exports = require('./app')
pixeldeck.get(/\/(.*)\.ts\.svg/, require('./getTilesetSvg'))
pixeldeck.get(/\/(.*)\.tm\.svg/, require('./getTilemapSvg'))
pixeldeck.get('/', require('./getRoot'))
function start () {
  const dbg = require('./dbg')
  const server = require('./server')
  server.listen(4444, function () {
    dbg('listening')
    const repl = require('./repl')
    pixeldeck.repl = repl.start()
    Object.defineProperties(pixeldeck.repl.context, {
      pixeldeck: { get: () => pixeldeck },
      server: { get: () => server }
    })
    pixeldeck.repl.on('close', function () {
      dbg('closing....')
      server.close();
    })
  })
}
if (require.main === module) start();
