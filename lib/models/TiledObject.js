/**
 *
 */
class TiledObject extends require('./Model') {
  /**
   *
   */
  static async createSchemaOn (table) {
    super.createSchemaOn(table)
    table.bool('ellipse')
    table.int('guid')
    table.string('name')
    table.integer('height')
    table.integer('opacity')
    table.bool('point')
    table.bool('polygon')
    table.string('type')
    table.bool('visible')
  }

  /**
   * Extend model SchemaProperties
   */
  static get jsonSchemaProperties () {
    var newProps = {}
    return Object.assign(newProps, super.jsonSchemaProperties, {
      ellipse: { type: 'bool' },
      uuid: { type: 'string' },
      id: { type: 'number' },
      gid: { type: 'number' },
      name: { type: 'string' },
      height: { type: 'number' },
      opacity: { type: 'number' },
      point: { type: 'bool' },
      polygon: { type: 'bool' },
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
      children: {
        relation: require('./Model').HasManyRelation,
        modelClass: require('./TiledLayer'),
        join: {
          from: 'TiledSet.id',
          to: 'TiledSet.TiledSetId'
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

module.exports = TiledObject
TiledObject.dbg('loaded')