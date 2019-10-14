/**
 *
 */
const data = require('../../data')
const dbg = data.dbg.extend(TileMapLayer.name)
class TileMapLayer extends Model {
  static get jsonSchema () {
    return Object.assign({}, super.jsonSchema(), {
      type: 'object',
      required: ['type'],
      properties: {
        // The Layer this Layer belongs to in a "group" layer.
        TileMapLayerUuid: { type: 'string', description: "for group type layers, the uuid of the layer this layer belongs too." },
        // TODO : chunks: { type: 'array', description: 'Array of chunks (optional). tilelayer only.' }, compression: { type: 'string', description: 'zlib, gzip or empty (default). tilelayer only.' },
        data: { type: 'array'/*TODO: or 'string'*/, description: 'Array of unsigned int (GIDs) or base64-encoded data. tilelayer only.' },
        draworder: { type: 'string', description: 'topdown (default) or index. objectgroup only.' },
        encoding: { type: 'string', description: 'csv (default) or base64`. ``tilelayer only.' },
        height: { type: 'number', description: 'Row count. Same as map height for fixed-size maps.' },
        id: { type: 'number', description: 'Incremental id - unique across all layers' },
        image: { type: 'string', description: 'Image used by this layer. imagelayer only.' },
        //TODO: Layers layers: { type: 'array', description: 'Array of layers. group on' },
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
      }
    })
  }

  static get relationMappings () {
    return {
      layers: {
        relation: data.Model.HasManyRelation,
        modelClass: 'TileMapLayer',
        join: {
          from: 'TileMapLayer.uuid',
          to: 'TileMapLayer.TileMapLayerUuid'
        }
      },
      chunks: {
        relation: data.Model.HasManyRelation,
        modelClass: 'TileMapLayerChunk',
        join: {
          from: 'TileMapLayer.uuid',
          to: 'TileMapLayerChunk.TileMapLayerUuid',
        }
      }
    }
  }

  /** TODO REMOVE?
  static async createSchema () {
    if (await knex.schema.hasTable('persons')) {
      return;
    }
    // Create database schema. You should use knex migration files
    // to do this. We create it here for simplicity.
    await knex.schema.createTable('persons', table => {
      table.increments('id').primary();
      table.number('height')
      table.boolean('infinite')
      //TODO: table.layers()
      table.number('nextlayerid')
      table.
        table.integer('parentId').references('persons.id');
      table.string('firstName');
    })
    */

}

module.exports = TileMapLayer
dbg('loaded')