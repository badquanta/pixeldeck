/**
 * Tiled lets many different kinds of things have properties.
 * So this represents that kind of relationship between many different
 * kinds of Tiled things:
 * @memberof mdl
 * @class
 * @extends mdl.TiledModel
 * @inheritdoc
 */
class TiledProperties extends require('./TiledModel') {
  /**
   * define the table for properties
   * @private
   */
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    /**
     * @name name
     * @type string
     * @memberof mdl.TiledProperties
     * @instance
     **/
    table.string('name')
    /**
     * @name type
     * @type string
     * @memberof mdl.TiledProperties
     * @instance
     **/
    table.string('type')
    /**
     * @name value
     * @type any
     * @memberof mdl.TiledProperties
     * @instance
     **/
    table.json('value')
    // TODO: Investigate a polymorphic way of handling these relations
    /**
     * @name TiledMapUuid
     * @type mdl.primaryKey
     * @memberof mdl.TiledProperties
     * @instance
     **/
    table.integer('TiledMapUuid')
    table.foreign('TiledMapUuid').references('TiledMap.uuid')
    /**
     * @name TiledLayerUuid
     * @type mdl.primaryKey
     * @memberof mdl.TiledProperties
     * @instance
     **/
    table.integer('TiledLayerUuid')
    table.foreign('TiledLayerUuid').references('TiledLayer.uuid')
    /**
     * @name TiledSetUuid
     * @type mdl.primaryKey
     * @memberof mdl.TiledProperties
     * @instance
     **/
    table.integer('TiledSetUuid')
    table.foreign('TiledSetUuid').references('TiledSet.uuid')
    /**
     * @name TiledTileUuid
     * @type mdl.primaryKey
     * @memberof mdl.TiledProperties
     * @instance
     **/
    table.integer('TiledTileUuid')
    table.foreign('TiledTileUuid').references('TiledTile.uuid')
    /**
     * @name TiledObjectUuid
     * @type mdl.primaryKey
     * @memberof mdl.TiledProperties
     * @instance
     **/
    table.integer('TiledObjectUuid')
    table.foreign('TiledObjectUuid').references('TiledObject.uuid')
  }

  /**
   * @private
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
