
/**
 * map [app](#app) handlers to routes
 */
let index = module.exports = require('./app')
index.get(/\/(.*)\.ts\.svg/, require('./getTileSetSvg'))
index.get(/\/(.*)\.tm\.svg/, require('./getTileMapSvg'))
index.get('/', require('./getRoot'))