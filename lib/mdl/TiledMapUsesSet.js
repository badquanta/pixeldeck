const TiledModel = require('./TiledModel')
/**
 * When a TiledMap needs a TiledSet...
 * @class
 * @inheritdoc
 * @memberof mdl
 * @extends mdl.TiledModel
 */
class TiledMapUsesSet extends TiledModel {
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    /**
     * @name source
     * @type string
     * @memberof mdl.TiledMapUsesSet
     * @instance
     */
    table.string('source')
    /**
     * @name firstgid
     * @type integer
     * @memberof mdl.TiledMapUsesSet
     * @instance
     */
    table.integer('firstgid')
    /**
     * @name TiledMapUuid
     * @type mdl.primaryKey
     * @memberof mdl.TiledMapUsesSet
     * @instance
     */
    table.integer('TiledMapUuid')
    /**
     * @name TiledSetUuid
     * @type mdl.primaryKey
     * @memberof mdl.TiledMapUsesSet
     * @instance
     */
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
        get modelClass () { return require('./TiledMap') },
        join: { from: 'TiledMapUsesSet.TiledMapUuid', to: 'TiledMap.uuid' }
      },
      TiledSet: {
        relation: TiledModel.BelongsToOneRelation,
        get modelClass () { return require('./TiledSet') },
        join: { from: 'TiledMapUsesSet.TiledSetUuid', to: 'TiledSet.uuid' }
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
