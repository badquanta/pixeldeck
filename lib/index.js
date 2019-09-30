/**
 * @name pixeldeck
 * @alias app
 * @alias root
 * @type express()
 */
const rootIdx = module.exports = require('./root')
rootIdx.get(/\/(.*)\.ts\.svg/, require('./getTilesetSvg'))
rootIdx.get(/\/(.*)\.tm\.svg/, require('./getTilemapSvg'))
rootIdx.get('/', require('./getRoot'))
