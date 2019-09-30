
/**
 * map [app](#app) handlers to routes
 */
const index = module.exports = require('./app')
index.get(/\/(.*)\.ts\.svg/, require('./getTilesetSvg'))
index.get(/\/(.*)\.tm\.svg/, require('./getTilemapSvg'))
index.get('/', require('./getRoot'))
