const TiledModel = require('./TiledModel')
/**
 * @class
 * @extends mdl.TiledModel
 * @memberof mdl
 * @inheritdoc
 */
class TiledPoint extends TiledModel {
  /**
   * define schma on {@link Knex.SchemaBuilder} schema builder..
   */
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    /**
     * @type mdl.primaryKey
     * @name TiledObjectPolygonUuid
     * @memberof mdl.TiledPoint
     * @instance
     */
    table.int('TiledObjectPolygonUuid')
    table.foreign('TiledObjectPolygonUuid').references('TiledObject.uuid')
    /**
     * @type mdl.primaryKey
     * @name TiledObjectPolylineUuid
     * @memberof mdl.TiledPoint
     * @instance
     */
    table.int('TiledObjectPolylineUuid')
    table.foreign('TiledObjectPolylineUuid').references('TiledObject.uuid')
    /**
     * @type integer
     * @name x
     * @memberof mdl.TiledPoint
     * @instance
     */
    table.int('x')
    /**
     * @type integer
     * @name y
     * @memberof mdl.TiledPoint
     * @instance
     */
    table.int('y')
  }
}
module.exports = TiledPoint
TiledPoint.dbg('loaded')
