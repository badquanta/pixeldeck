const { Model: Objection } = require('objection')
const data = require('../data')
const dbg = data.dbg.extend('Model')
Objection.knex(data.base)
/**
 * @name pixelmap.data.Model
 */
class Model extends Objection {
  static get idColumn () {
    return 'uuid'
  }

  // Table name is the only required property.
  static get tableName () {
    dbg('get TableName:', this.name)
    return this.name
  }

  static get jsonSchemaRequired () {
    return undefined
  }

  static get jsonSchemaProperties () {
    var newProps = {
      uuid: {
        type: 'string'
      }
    }
    return newProps
  }

  static get jsonSchema () {
    return {
      type: 'object',
      properties: this.jsonSchemaProperties,
      required: this.jsonSchemaRequired
    }
  }

  static async createSchemaOn (table) {
    table.string('uuid').primary()
    table.integer('id')
  }

  static async createSchema (Knex = data.base) {
    if (await Knex.schema.hasTable(this.name)) {
      return
    }
    // Create database schema. You should use knex migration files
    // to do this. We create it here for simplicity.
    return Knex.schema.createTable(this.name, (table) => {
      return this.createSchemaOn(table)
    })
  }
}
module.exports = Model
