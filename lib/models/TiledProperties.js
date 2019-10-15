/**
 * Tiled lets many different kinds of things have properties.
 * So this represents that kind of relationship between many different
 * kinds of Tiled things:
 */
class TiledProperties extends require('./Model') {
  /**
   * define the table for properties
   */
  static async createSchemaOn (table) {

    super.createSchemaOn(table)
    table.string('name')
    table.string('type')
    table.string('value')
    // TODO: Investigate a polymorphic way of handling these relations
    table.integer('TiledMapUuid')
    table.integer('TiledLayerUuid')
    table.integer('TiledSetUuid')
    table.integer('TiledObjectUuid')
  }

  /**
   *
   */
  static get jsonSchemaProperties () {
    return Object.assign({}, super.jsonSchemaProperties, {
      name: { type: 'string' },
      type: { type: 'string' },
      value: { type: 'string' }
    })
  }
}

module.exports = TiledProperties
TiledProperties.dbg('loaded')
