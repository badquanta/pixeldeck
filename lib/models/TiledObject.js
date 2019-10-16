const TiledModel = require('./TiledModel')
/**
 *
 */
class TiledObject extends TiledModel {
  /**
   *
   */
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    table.integer('TiledLayerUuid')
    table.bool('ellipse')
    table.int('gid')

    table.double('height')
    table.int('id')
    table.string('name')
    table.bool('point')
    // table.bool('polygon')
    // table.bool('polyline')
    table.double('rotation')
    table.string('template')
    table.string('text')
    table.string('type')
    table.bool('visible')
    table.double('width')
    table.double('x')
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