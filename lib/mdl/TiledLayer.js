const Model = require('./TiledModel')
/**
 * @classdesc Objection representation of TiledLayer. {@link https://docs.mapeditor.org/en/stable/reference/json-map-format/#layer}
 * @class
 * @augments mdl.TiledModel
 * @inheritdoc
 * @memberof mdl
 * @todo need to re-implement data
 */
class TiledLayer extends Model {
  /**
   *
   * @param {*} table
   */
  static async createSchemaOn (table) {
    this.dbg('createSchemaOn')
    super.createSchemaOn(table)
    /**
     * @name type
     * @type string
     * @memberof mdl.TiledLayer
     * @instance
     */
    table.string('type')
    /**
     * @name data
     * @type string
     * @memberof mdl.TiledLayer
     * @instance
     */
    table.string('data')
    /**
     * @name TiledLayerUuid
     * @type mdl.primaryKey
     * @memberof mdl.TiledLayer
     * @instance
     */
    table.integer('TiledLayerUuid')
    table.foreign('TiledLayerUuid').references('TiledLayer.uuid')
    /**
     * @name TiledMapUuid
     * @type mdl.primaryKey
     * @memberof mdl.TiledLayer
     * @instance
     */
    table.integer('TiledMapUuid')
    table.foreign('TiledMapUuid').references('TiledMap.uuid')
    // TODO: table.array('data')
    /**
     * @name draworder
     * @type string
     * @memberof mdl.TiledLayer
     * @instance
     */
    table.string('draworder')
    /**
     * @name encoding
     * @type string
     * @memberof mdl.TiledLayer
     * @instance
     */
    table.string('encoding')
    /**
     * @name height
     * @type integer
     * @memberof mdl.TiledLayer
     * @instance
     */
    table.integer('height')
    /**
     * @name id
     * @type integer
     * @memberof mdl.TiledLayer
     * @instance
     */
    table.integer('id')
    /**
     * @name name
     * @type string
     * @memberof mdl.TiledLayer
     * @instance
     */
    table.string('name')
    // TODO: table.objects('objects')
    /**
     * @name offsetx
     * @type double
     * @memberof mdl.TiledLayer
     * @instance
     */
    table.double('offsetx')
    /**
     * @name offsety
     * @type double
     * @memberof mdl.TiledLayer
     * @instance
     */
    table.double('offsety')
    /**
     * @name opacity
     * @type double
     * @memberof mdl.TiledLayer
     * @instance
     */
    table.double('opacity')
    // TODO: table.array('properties')
    /**
     * @name transparentColor
     * @type string
     * @memberof mdl.TiledLayer
     * @instance
     */
    table.string('transparentColor')
    /**
     * @name visible
     * @type boolean
     * @memberof mdl.TiledLayer
     * @instance
     */
    table.bool('visible')
    /**
     * @name width
     * @type integer
     * @memberof mdl.TiledLayer
     * @instance
     */
    table.int('width')
    /**
     * @name x
     * @type integer
     * @memberof mdl.TiledLayer
     * @instance
     */
    table.int('x')
    /**
     * @name y
     * @type integer
     * @memberof mdl.TiledLayer
     * @instance
     */
    table.int('y')
    // Not documented but apparently expected in layers?
    /**
     * @name startx
     * @type integer
     * @memberof mdl.TiledLayer
     * @instance
     */
    table.int('startx')
    /**
     * @name starty
     * @type integer
     * @memberof mdl.TiledLayer
     * @instance
     */
    table.int('starty')
    return table
  }

  /**
   * @override
   */
  static get jsonSchemaProperties () {
    const props = {}
    return Object.assign(props, super.jsonSchemaProperties, {
      // The Layer this Layer belongs to in a 'group' layer.
      TiledLayerUuid: { type: 'number' },
      // TODO : chunks: { type: 'array'},
      data: { type: 'array'/* TODO: or 'string' */ },
      draworder: { type: 'string' },
      encoding: { type: 'string' },
      height: { type: 'number' },
      id: { type: 'number' },
      image: { type: 'string' },
      // TODO: Layers layers: { type: 'array'},
      name: { type: 'string' },
      // Made into a relationship objects: { type: 'object' },
      offsetx: { type: 'double' },
      offsety: { type: 'double' },
      opacity: { type: 'double' },
      properties: { type: 'array' },
      transparentcolor: { type: 'string' },
      type: { type: 'string' },
      visible: { type: 'bool' },
      width: { type: 'number' },
      x: { type: 'number' },
      y: { type: 'number' }
    })
  }

  /**
   *
   * @param {*} Knex
   */
  static async beforeEnsureSchema (Knex) {
    await super.beforeEnsureSchema(Knex)
    await this.ensureAllSchemas(Knex, require('./TiledObject'), require('./TiledProperties'), require('./TiledChunk'))
  }

  /**
   * defines relationships between:
   * * Has many {@link mdl.TiledLayer}
   * * Has many {@link mdl.TiledObject}
   * * Has many {@link mdl.TiledProperties}
   * * Has many {@link mdl.TiledChunk}
   */
  static get relationMappings () {
    return {
      layers: {
        relation: Model.HasManyRelation,
        modelClass: TiledLayer,
        join: {
          from: 'TiledLayer.uuid',
          to: 'TiledLayer.TiledLayerUuid'
        }
      },
      objects: {
        relation: Model.HasManyRelation,
        get modelClass () { return require('./TiledObject') },
        join: {
          from: 'TiledLayer.uuid',
          to: 'TiledObject.TiledLayerUuid'
        }
      },
      properties: {
        relation: Model.HasManyRelation,
        get modelClass () { return require('./TiledProperties') },
        join: {
          from: 'TiledLayer.uuid',
          to: 'TiledProperties.TiledLayerUuid'
        }
      },
      chunks: {
        relation: Model.HasManyRelation,
        get modelClass () { return require('./TiledChunk') },
        join: {
          from: 'TiledLayer.uuid',
          to: 'TiledChunk.TiledLayerUuid'
        }
      }
    }
  }
}
module.exports = TiledLayer
TiledLayer.dbg('loaded')
