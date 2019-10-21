const TiledModel = require('./TiledModel')
/**
 * When a TiledMap needs a TiledSet...
 * @memberof mdl
 * @property {string} source
 * @property {integer} firstgid
 * @property {foreignKey} TiledMapUuid
 * @property {mdl.TiledMap} tiledMap
 * @property {foreignKey} TiledSetUuid
 * @property {mdl.TiledSet} tiledSet
 * @extends mdl.TiledModel
 */
class TiledMapUsesSet extends TiledModel {
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    table.string('source')
    table.integer('firstgid')
    table.integer('TiledMapUuid')
    table.integer('TiledSetUuid')
  }

  /**
   * extend model schemaProperties
   * @type {object}
   */
  static get jsonSchemaProperties () {
    return Object.assign({}, super.jsonSchemaProperties, {
      source: { type: 'string' },
      firstgid: { type: 'number' },
      TiledMapUuid: { type: 'integer' },
      TiledSetUuid: { type: 'integer' }
    })
  }

  /**
   *  Define relations
   * @see mdl.TiledMap
   * @see mdl.TiledSet
   */
  static get relationMappings () {
    return {
      TiledMap: {
        relation: TiledModel.BelongsToOneRelation,
        modelClass: 'TiledMap',
        join: { from: 'TiledMapUsesSet.TiledMapUuid', to: 'TiledMap.uuid' }
      },
      TiledSet: {
        relation: TiledModel.BelongsToOneRelation,
        modelClass: 'TiledSet',
        join: { from: 'TiledMapUsersTiledSet.TiledSetUuid', to: 'TiledSet.uuid' }
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

module.exports = TiledMapUsesSet
TiledMapUsesSet.dbg('loaded')
