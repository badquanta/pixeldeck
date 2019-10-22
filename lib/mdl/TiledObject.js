const TiledModel = require('./TiledModel')
/**
 *
 * @memberof mdl
 * @class
 * @extends mdl.TiledModel
 * @inheritdoc
 */
class TiledObject extends TiledModel {
  /**
   * @override
   */
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    /**
     * @name TiledLayerUuid
     * @type mdl.primaryKey
     * @memberof mdl.TiledObject
     * @instance
     */
    table.integer('TiledLayerUuid')
    table.foreign('TiledLayerUuid').references('TiledLayer.uuid')
    /**
     * @name ellipse
     * @type boolean
     * @memberof mdl.TiledObject
     * @instance
     */
    table.bool('ellipse')
    /**
     * @name gid
     * @type int
     * @memberof mdl.TiledObject
     * @instance
     */
    table.int('gid')
    /**
     * @name height
     * @type double
     * @memberof mdl.TiledObject
     * @instance
     */
    table.double('height')
    /**
     * @name id
     * @type int
     * @memberof mdl.TiledObject
     * @instance
     */
    table.int('id')
    /**
     * @name name
     * @type string
     * @memberof mdl.TiledObject
     * @instance
     */
    table.string('name')
    /**
     * @name point
     * @type boolean
     * @memberof mdl.TiledObject
     * @instance
     */
    table.bool('point')
    // table.bool('polygon')
    // table.bool('polyline')
    /**
     * @name rotation
     * @type double
     * @memberof mdl.TiledObject
     * @instance
     */
    table.double('rotation')
    /**
     * @name template
     * @type string
     * @memberof mdl.TiledObject
     * @instance
     */
    table.string('template')
    /**
     * @name text
     * @type string
     * @memberof mdl.TiledObject
     * @instance
     */
    table.string('text')
    /**
     * @name type
     * @type string
     * @memberof mdl.TiledObject
     * @instance
     */
    table.string('type')
    /**
     * @name visible
     * @type boolean
     * @memberof mdl.TiledObject
     * @instance
     */
    table.bool('visible')
    /**
     * @name width
     * @type double
     * @memberof mdl.TiledObject
     * @instance
     */
    table.double('width')
    /**
     * @name x
     * @type double
     * @memberof mdl.TiledObject
     * @instance
     */
    table.double('x')
    /**
     * @name y
     * @type double
     * @memberof mdl.TiledObject
     * @instance
     */
    table.double('y')
  }

  /**
   * Extend model SchemaProperties
   */
  static get jsonSchemaProperties () {
    var newProps = {}
    return Object.assign(newProps, super.jsonSchemaProperties, {
      TiledLayerUuid: { type: 'number' },
      ellipse: { type: 'bool' },
      uuid: { type: 'string' },
      id: { type: 'number' },
      gid: { type: 'number' },
      name: { type: 'string' },
      height: { type: 'number' },
      opacity: { type: 'number' },
      point: { type: 'bool' },
      // TODO: polygon: { type: 'bool' },
      // TODO: polyline
      type: { type: 'string' },
      visible: { type: 'boolean' },
      width: { type: 'number' },
      x: { type: 'number' },
      y: { type: 'number' }
    })
  }

  static async beforeEnsureSchema (Knex) {
    await super.beforeEnsureSchema(Knex)
    await this.ensureAllSchemas(Knex, require('./TiledProperties'), require('./TiledPoint'))
  }

  /**
   * define relational mappings
   */
  static get relationMappings () {
    return {
      properties: {
        relation: TiledModel.HasManyRelation,
        get modelClass () { return require('./TiledProperties') },
        join: {
          from: 'TiledObject.uuid',
          to: 'TiledProperties.TiledObjectUuid'
        }

      },
      polygon: {
        relation: TiledModel.HasManyRelation,
        get modelClass () { return require('./TiledPoint') },
        join: {
          from: 'TiledObject.uuid',
          to: 'TiledPoint.TiledObjectPolygonUuid'
        }
      },
      polyline: {
        relation: TiledModel.HasManyRelation,
        get modelClass () { return require('./TiledPoint') },
        join: {
          from: 'TiledObject.uuid',
          to: 'TiledPoint.TiledObjectPolylineUuid'
        }
      }
    }
  }
}

module.exports = TiledObject
TiledObject.dbg('loaded')
