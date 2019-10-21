const Model = require('./TiledModel')
/**
 * @classdesc Objection representation of TiledLayer. {@link https://docs.mapeditor.org/en/stable/reference/json-map-format/#layer}
 * @class
 * @augments mdl.TiledModel
 * @inheritdoc
 * @memberof mdl
 * @property {string} type
 * @todo need to re-implement data
 * @property {string} data
 * @property {foreignKey} TiledLayerUuid
 * @property {foreignKey} TiledMapUuid
 * @property {string} draworder
 * @property {string} encoding
 * @property {integer} height
 * @property {integer} id
 * @property {string} name
 * @property {double} offsetx
 * @property {double} offsety
 * @property {double} opacity
 * @property {string} transparentColor
 * @property {boolean} visible
 * @property {integer} width
 * @property {integer} x
 * @property {integer} y
 * @property {integer} startx
 * @property {integer} starty
 */
class TiledLayer extends Model {
  /**
   *
   * @param {*} table
   */
  static async createSchemaOn (table) {
    this.dbg('createSchemaOn')
    super.createSchemaOn(table)
    table.string('type')
    table.string('data')
    table.integer('TiledLayerUuid')
    table.foreign('TiledLayerUuid').references('TiledLayer.uuid')
    table.integer('TiledMapUuid')
    table.foreign('TiledMapUuid').references('TiledMap.uuid')
    // TODO: table.array('data')
    table.string('draworder')
    table.string('encoding')
    table.integer('height')
    table.integer('id')
    table.string('name')
    // TODO: table.objects('objects')
    table.double('offsetx')
    table.double('offsety')
    table.double('opacity')
    // TODO: table.array('properties')
    table.string('transparentColor')
    table.bool('visible')
    table.int('width')
    table.int('x')
    table.int('y')
    // Not documented but apparently expected in layers?
    table.int('startx')
    table.int('starty')
    return table
  }

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
