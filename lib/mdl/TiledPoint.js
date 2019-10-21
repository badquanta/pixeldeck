const TiledModel = require('./TiledModel')
/**
 * @class
 * @extends mdl.TiledModel
 * @memberof mdl
 * @property {number} x
 * @property {number} y
 * @property {int} TiledObjectPolygonUuid
 * @property {int} TiledObjectPolylineUuid
 */
class TiledPoint extends TiledModel {
  /**
   * define schma on {@link Knex.SchemaBuilder} schema builder..
   */
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    table.int('TiledObjectPolygonUuid')
    table.foreign('TiledObjectPolygonUuid').references('TiledObject.uuid')
    table.int('TiledObjectPolylineUuid')
    table.foreign('TiledObjectPolylineUuid').references('TiledObject.uuid')
    table.int('x')
    table.int('y')
  }
}
module.exports = TiledPoint
TiledPoint.dbg('loaded')
