const TiledModel = require('./TiledModel')
/**
 * One frame of a {@link mdl.TiledTile}#animation collection
 * @extends mdl.TiledModel
 * @memberof mdl
 * @property {foreignKey} TiledTileUuid
 * @property {number} duration
 * @property {number} tileid
 */
class TiledFrame extends TiledModel {
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    table.int('TiledTileUuid')
    table.foreign('TiledTileUuid').references('TiledTile.uuid')
    table.int('duration')
    table.int('tileid')
  }
}

module.exports = TiledFrame
TiledFrame.dbg('loaded')
