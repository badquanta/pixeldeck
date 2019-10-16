const TiledModel = require('./TiledModel')
/**
 * Part of TiledTile.animation
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
