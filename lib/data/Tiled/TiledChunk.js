/**
 *
 */
const dbg = require('../../dbg').extend('data:TileSetLayer')
const knex = require('knex')
const Model = require('../Model')
class TileMapLayer extends Model {
  static get jsonSchema () {
    return Object.assign({}, super.jsonSchema(), {
      type: 'object',
      required: ['type'],
      properties: {
        TileMapLayerUuid: { type: 'string', description: 'Which tile map layer does this chunk belong?' },
        data: { type: 'array<number>', description: 'Array of unsigned int (GIDs) or base64-encoded data. tilelayer only.' },
        height: { type: 'int', description: 'Row count. Same as map height for fixed-size maps.' },
        width: { type: 'int', description: 'Column count. Same as map width for fixed-size maps.' },
        x: { type: 'int', description: 'Horizontal layer offset in tiles. Always 0.' },
        y: { type: 'int', description: 'Vertical layer offset in tiles. Always 0.' }
      }
    })
  }

  static get relationMappings () {
    return {
      TileMapLayer: {
        relation: Model.BelongsToOneRelation,
        modelClass: 'TileMapLayer',
        join: {
          from: 'TileMapLayerChunk.TileMapLayerUuid',
          to: 'TileMapLayer.uuid'
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