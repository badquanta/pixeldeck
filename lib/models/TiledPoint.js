const TiledModel = require('./TiledModel')
/**
 *
 *
 */
class TiledPoint extends TiledModel {
  /**
   *
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
