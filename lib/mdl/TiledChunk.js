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
 * @example An Example
 *  const TiledChunk = require('pixeldeck/lib/mdl/TiledChunk')
 *  TiledChunk.ensureSchema().then(async ()=>{
 *  const newChunk = await TiledChunk.query().insertGraph({data:'values'})
 *  })
 */
class TiledChunk extends require('./TiledModel') {
  /**
   * define persisted properties on table.
   * @override
   **/
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    /**
     * @name TiledLayerUuid
     * @type mdl.primaryKey
     * @memberof mdl.TiledChunk
     * @instance
     */
    table.int('TiledLayerUuid')
    table.foreign('TiledLayerUuid').references('TiledLayer.uuid')
    /**
     * @name data
     * @type integer[]
     * @memberof mdl.TiledChunk
     * @instance
     * @todo Redo data members into special relationship classes
     */
    table.json('data')
    /**
     * @name height
     * @type integer
     * @memberof mdl.TiledChunk
     * @instance
     */
    table.int('height')
    /**
     * @name width
     * @type integer
     * @memberof mdl.TiledChunk
     * @instance
     */
    table.int('width')
    /**
     * @name x
     * @type integer
     * @memberof mdl.TiledChunk
     * @instance
     */
    table.int('x')
    /**
     * @name y
     * @type integer
     * @memberof mdl.TiledChunk
     * @instance
     */
    table.int('y')
  }

  /**
   * @override
   */
  static get jsonSchemaProperties () {
    // eslint-disable-next-line no-new-object
    return Object.assign(new Object(), super.jsonSchemaProperties, {
      data: { type: 'array' },
      height: { type: 'integer' },
      // TiledLayerUuid: { type: 'integer' },
      width: { type: 'integer' },
      x: { type: 'integer' },
      y: { type: 'integer' }
    })
  }
}
module.exports = TiledChunk
TiledChunk.dbg('loaded')
