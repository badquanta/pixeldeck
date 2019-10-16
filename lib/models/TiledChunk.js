/**
 *
 */
class TiledChunk extends require('./TiledModel') {
  /**
   * extend the table for chunks:
   */
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    table.int('TileLayerUuid')
    table.foreign('TileLayerUuid').references('TiledLayer.uuid')
    table.json('data')
    table.int('height')
    table.int('width')
    table.int('x')
    table.int('y')
  }
}
module.exports = TiledChunk
TiledChunk.dbg('loaded')
