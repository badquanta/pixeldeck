
const dbg = require('../../dbg').extend('data:TileSetLayer')
const knex = require('knex')
const Model = require('../Model')
/**
 * When a TileMap needs a TileSet...
 * @see {TileMap}
 * @see {TileSet}
 */
class TileMapUsesTileSet extends Model {
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['type'],
      properties: {
        source: { type: 'string' },
        firstgid: { type: 'number' },
        TileMapUuid: { type: 'string' },
        TileSetUuid: { type: 'string' }
      }
    }
  }

  static get relationMappings () {
    return {
      TileMap: {
        relation: Model.BelongsToOneRelation,
        modelClass: 'TileMap',
        join: { from: 'TileMapUsesTileSet.TileMapUuid', to: 'TileMap.uuid' }
      },
      TileSet: {
        relation: Model.BelongsToOneRelation,
        modelClass: 'TileSet',
        join: { from: 'TileMapUsersTileSet.TileSetUuid', to: 'TileSet.uuid' }
      }
      Model.BelongsToOneRelation
      children: {
        relation: Model.HasManyRelation,
        modelClass: require('./TileLayer'),
        join: {
          from: 'TileSet.id',
          to: 'TileSet.TileSetId'
        }
      }
    };
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

module.exports = TileMapUsesTileSet
dbg('loaded')