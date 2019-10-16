/**
 * Tiled lets many different kinds of things have properties.
 * So this represents that kind of relationship between many different
 * kinds of Tiled things:
 */
class TiledProperties extends require('./TiledModel') {
  /**
   * define the table for properties
   */
  static async createSchemaOn (table) {

    super.createSchemaOn(table)
    table.string('name')
    table.string('type')
    table.json('value')
    // TODO: Investigate a polymorphic way of handling these relations
    table.integer('TiledMapUuid')
    table.foreign('TiledMapUuid').references('TiledMap.uuid')
    table.integer('TiledLayerUuid')
    table.foreign('TiledLayerUuid').references('TiledLayer.uuid')
    table.integer('TiledSetUuid')
    table.foreign('TiledSetUuid').references('TiledSet.uuid')
    table.integer('TiledTileUuid')
    table.foreign('TiledTileUuid').references('TiledTile.uuid')
    table.integer('TiledObjectUuid')
    table.foreign('TiledObjectUuid').references('TiledObject.uuid')
  }

  /**
   *
   */
  static get jsonSchemaProperties () {
    return Object.assign({}, super.jsonSchemaProperties, {
      name: { type: 'string' },
      type: { type: 'string' },
      value: { type: 'any' }
    })
  }

}

module.exports = TiledProperties
TiledProperties.dbg('loaded')
