/**
 *
 */
const dbg = require('../dbg').extend('data:TileSetLayer')
const knex = require('knex')
const Model = require('./Model')
class TileLayer extends Model {
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['type'],
      properties: {
        id: { type: 'integer' },
        // TODO: data
        // TODO: chunks
        height: { type: 'number' },
        name: { type: 'string' },
        opacity: { type: 'number' },
        type: { type: 'string' },
        visible: { type: 'boolean' },
        width: { type: 'number' },
        x: { type: 'number' },
        y: { type: 'number' }
      }
    }
  }

  static get relationMappings () {
    return {
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

module.exports = TileLayer
dbg('loaded')