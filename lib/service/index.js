
/**
 * map [app](#app) handlers to routes
 * @alias service
 * @type {app}
 */
const index = module.exports = require('./app')
index.get(/\/(.*)\.ts\.svg/, require('./getTileSetSvg'))
index.get(/\/(.*)\.tm\.svg/, require('./getTileMapSvg'))
index.get(...require('./getTileMapHtml'))
index.get('/', require('./getRoot'))
