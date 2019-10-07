/**
 * another handy-dandy index-type object that'll fetch what you need but not before you ask.
 * @namespace pixeldeck.data
 */
// eslint-disable-next-line no-unused-vars
const data = module.exports = {
  /**
   * The Loki backend
   */
  get base () { return require('./data/base') },
  /**
   * The TileMap ORM
   * @type {TileMaps}
   */
  get TileMaps () { return require('./data/TileMaps') },
  /**
   * The TileSet ORM
   * @type {TileSets}
   */
  get TileSets () { return require('./data/TileSets') }
}
