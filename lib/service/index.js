
/**
 * map [app](#app) handlers to routes
 */
let index = require('./app')
index.get(/\/(.*)\.ts\.svg/, require('./getTileSetSvg'))
index.get(/\/(.*)\.tm\.svg/, require('./getTileMapSvg'))
index.get('/', require('./getRoot'))

/**
 * @name service
 */
Object.defineProperties(module.exports, {
  index: { get: getIndex },
  app: { get: () => require('./app') },// TODO: REVIEW: Why lie?
  getRoot: { get: () => require('./getRoot') },
  getTileMapSvg: { get: () => require('./getTileMapSvg') },
  getTileSetSvg: { get: () => require('./getTileSetSvg') }
})