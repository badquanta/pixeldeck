const Model = require('./Model')
/**
 * @see {@link https://docs.mapeditor.org/en/stable/reference/json-map-format/#layer}
 */
class TiledLayer extends Model {
  /**
   *
   * @param {*} table
   */
  static async createSchemaOn (table) {
    this.dbg('createSchemaOn')
    super.createSchemaOn(table)
    table.integer('TiledLayerUuid')
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
    return table
  }

  static get jsonSchemaProperties () {
    const props = {}
    return Object.assign(props, super.jsonSchemaProperties, {
      // The Layer this Layer belongs to in a 'group' layer.
      TiledLayerUuid: { type: 'number', description: 'for group type layers, the uuid of the layer this layer belongs too.' },
      // TODO : chunks: { type: 'array', description: 'Array of chunks (optional). tilelayer only.' }, compression: { type: 'string', description: 'zlib, gzip or empty (default). tilelayer only.' },
      data: { type: 'array'/* TODO: or 'string' */, description: 'Array of unsigned int (GIDs) or base64-encoded data. tilelayer only.' },
      draworder: { type: 'string', description: 'topdown (default) or index. objectgroup only.' },
      encoding: { type: 'string', description: 'csv (default) or base64`. ``tilelayer only.' },
      height: { type: 'number', description: 'Row count. Same as map height for fixed-size maps.' },
      id: { type: 'number', description: 'Incremental id - unique across all layers' },
      image: { type: 'string', description: 'Image used by this layer. imagelayer only.' },
      // TODO: Layers layers: { type: 'array', description: 'Array of layers. group on' },
      name: { type: 'string', description: 'Name assigned to this layer' },
      objects: { type: 'object', description: 'Array of objects. objectgroup only.' },
      offsetx: { type: 'double', description: 'Horizontal layer offset in pixels (default: 0)' },
      offsety: { type: 'double', description: 'Vertical layer offset in pixels (default: 0)' },
      opacity: { type: 'double', description: 'Value between 0 and 1' },
      properties: { type: 'array', description: 'A list of properties (name, value, type).' },
      transparentcolor: { type: 'string', description: 'Hex-formatted color (#RRGGBB) (optional, imagelayer only' },
      type: { type: 'string', description: 'tilelayer, objectgroup, imagelayer or group' },
      visible: { type: 'bool', description: 'Whether layer is shown or hidden in editor' },
      width: { type: 'number', description: 'Column count. Same as map width for fixed-size maps.' },
      x: { type: 'number', description: 'Horizontal layer offset in tiles. Always 0.' },
      y: { type: 'number', description: 'Vertical layer offset in tiles. Always 0.' }
    })
  }

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
        modelClass: 'TiledLayerChunk',
        join: {
          from: 'TiledLayer.uuid',
          to: 'TiledLayerChunk.TiledLayerUuid'
        }
      }
    }
  }
}
module.exports = TiledLayer
TiledLayer.dbg('loaded')
