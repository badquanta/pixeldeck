/**
 *
 */
class TiledChunk extends require('./TiledModel') {
  /**
   * extend the table for chunks:
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
