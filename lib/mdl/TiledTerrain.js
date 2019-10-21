const TiledModel = require('./TiledModel')
/**
 * @memberof mdl
 */
class TiledTerrain extends TiledModel {
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    table.int('TiledSetUuid')
    table.foreign('TiledSetUuid').references('TiledSet.uuid')
    table.string('name')
    table.int('tile')
  }
}

module.exports = TiledTerrain
TiledTerrain.dbg('loaded')
