const TiledModel = require('./TiledModel')
/**
 * One frame of a {@link mdl.TiledTile}#animation collection
 * @class
 * @extends mdl.TiledModel
 * @memberof mdl
 * @inheritdoc
 */
class TiledFrame extends TiledModel {
  /**
   * @override
   */
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    /**
     * @name TiledTileUuid
     * @type mdl.primaryKey
     * @memberof mdl.TiledFrame
     * @instance
     */
    table.int('TiledTileUuid')
    table.foreign('TiledTileUuid').references('TiledTile.uuid')
    /**
     * @name duration
     * @type integer
     * @memberof mdl.TiledFrame
     * @instance
     */
    table.int('duration')
    /**
     * @name tileid
     * @type integer
     * @memberof mdl.TiledFrame
     * @instance
     */
    table.int('tileid')
  }
}

module.exports = TiledFrame
TiledFrame.dbg('loaded')
