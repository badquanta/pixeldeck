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
  get TiledMap () { return require('./data/Tiled/TiledMap') },
  /**
   * The TileMap ORM
   * @type {TileMaps}
   */
  get TiledLayer () { return require('./data/Tiled/TiledLayer') },
  /**
   * The TileMap ORM
   * @type {TileMaps}
   */
  get TiledObjectGroup () { return require('./data/TileMapObjectGroup') },
  /**
  * The TileMap ORM
  * @type {TileMaps}
  */
  get TileMapLayer () { return require('./data/Tiled/TiledLayer') },/**
 * The TileMap ORM
 * @type {TileMaps}
 */
  get TiledMap () { return require('./data/Tiled/TiledMap') },
  /**
   * The TileSet ORM
   * @type {TileSets}
   */
  get TiledSet () { return require('./data/Tiled/TiledSet') },
  /**
   * Pixeldeck instance of objection model.
   */
  get Model () { return require('./data/Model') },
  /**
   * Hey wow.. should I even bother doting things like this?
   */
  get dbg () { return require('./dbg').extend('data') },
  /**
   * just a handy dand ref for knex.
   *
   */
  get Knex () { return require('knex') },

  get all () {
    var all = [
      this.Model, this.TiledSet
    ]
    return all
  },

  async createTables () {
    this.dbg('Create Tables')
    return Promise.all([
      this.Model.createSchema(this.base),
      this.TiledSet.createSchema(this.base)
    ]
    ).finally(() => {
      this.dbg('After create tables')
    })
  }
}

data.dbg('loaded')
