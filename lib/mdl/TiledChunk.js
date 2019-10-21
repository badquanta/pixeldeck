/**
 * A `gid` is a unique integer value within each [TiledMap]{@link mdl.TiledMap}
 * that maps to a particular [TiledTile]{@link mdl.TiledTile}
 * through [TiledMapUsesSet]{@link mdl.TiledMapUsesSet}
 * where each of those notes which `gid` each used [TiledSet]{@link mdl.TiledSet} starts with and the actual `TileSet` is the
 * difference between the last `firstgid` of a `TiledMapUsesSet` that isn't over the needed `gid`.
 * @typedef mdl.TiledGid
 * @augments Number
*/

/**
 * @classdesc {@link https://docs.mapeditor.org/en/stable/reference/json-map-format/#chunk}
 * @memberof mdl
 * @extends mdl.TiledModel
 * @inheritdoc
 * @property {foreignKey} TiledLayerUuid links this chunk to a layer.
 * @property {mdl.TiledLayer} tiledLayer the layer linked by `TiledLayerUuid`
 * @property {mdl.TiledGid[]} data This acts as an array of numbers the length of which matches `width`*`height`.
 * Each entry is a number that represents a tile `gid`.
 * In reality this is a proxy object that is querying and serializing database records on demand for each idx.
 * @todo redo property `data` into a virtual property
 * @property {number} height
 * @property {number} width
 * @property {number} x
 * @property {number} y
 * @example An Example
 *  const TiledChunk = require('pixeldeck/lib/mdl/TiledChunk')
 *  TiledChunk.ensureSchema().then(async ()=>{
 *  const newChunk = await TiledChunk.query().insertGraph({json:'values'})
 *  })
 */
class TiledChunk extends require('./TiledModel') {
  /**
   * define persisted properties on table.
   */
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    table.int('TiledLayerUuid')
    table.foreign('TiledLayerUuid').references('TiledLayer.uuid')
    table.string('data')
    table.int('height')
    table.int('width')
    table.int('x')
    table.int('y')
  }
}
module.exports = TiledChunk
TiledChunk.dbg('loaded')
