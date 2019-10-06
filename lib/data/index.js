/**
 * another handy-dandy index
 * @type {{base:Loki,TileMaps:TileMaps,TileSets:TileSets}}
 */
// eslint-disable-next-line no-unused-vars
const data = Object.defineProperties(module.exports, {
  base: { get: () => require('./base') },
  TileMaps: { get: () => require('./TileMaps') },
  TileSets: { get: () => require('./TileSets') }
})
