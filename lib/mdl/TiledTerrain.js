
const TiledModel = require('./TiledModel')
/**
 * @memberof mdl
 * @class
 * @extends mdl.TiledModel
 * @inheritdoc
 */
class TiledTerrain extends TiledModel {
  /**
   * @override
   * @param {*} table
   */
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    /**
     * @name TiledSetUuid
     * @type mdl.primaryKey
     * @memberof mdl.TiledTerrain
     * @instance
     */
    table.int('TiledSetUuid')
    table.foreign('TiledSetUuid').references('TiledSet.uuid')
    /**
     * @name name
     * @type string
     * @memberof mdl.TiledTerrain
     * @instance
     */
    table.string('name')
    /**
     * @name tile
     * @type integer
     * @memberof mdl.TiledTerrain
     * @instance
     */
    table.int('tile')
  }
}

module.exports = TiledTerrain
TiledTerrain.dbg('loaded')
