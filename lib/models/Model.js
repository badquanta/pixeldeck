const { Model: Objection } = require('objection')

/**
 * @name pixelmap.data.Model
 */
class Model extends Objection {

  /**
   * return the class debugger
   */
  static get dbg () { return super.dbg ? super.dbg.extend(this.name, '>') : require('../dbg').extend(this.name) }
  /**
   * return the instance debugger
   */
  get dbg () { return this.constructor.dbg.extend('instance') }
  /**
   * get the class's id column; Model defines this as uuid globally.
   */
  static get idColumn () {
    return 'uuid'
  }

  /**
   * get the class's table name; which should be the class name.
   */
  static get tableName () {
    //this.dbg('get TableName:', this.name)
    return this.name
  }

  /**
   * define what this class requires; should be overridden if anything is required.
   */
  static get jsonSchemaRequired () {
    return undefined
  }

  /**
   * define what properties this class defines; should be EXTENDED
   */
  static get jsonSchemaProperties () {
    var newProps = {
      uuid: {
        type: 'integer'
      }
    }
    this.dbg('get jsonSchemaProperties %o', newProps)
    return newProps
  }

  static get jsonSchema () {
    var newSchema = {
      type: 'object',
      properties: this.jsonSchemaProperties,
      required: this.jsonSchemaRequired
    }
    this.dbg('get jsonSchema = %o', newSchema)
    return newSchema
  }

  static async createSchemaOn (table) {
    this.dbg('Model createSchemaOn')
    table.increments('uuid').primary()
    return table
  }

  static async createSchema (Knex = require('../knex')) {
    return this.ensureSchema(Knex, true)
  }

  static async ensureSchema (Knex = require('../knex'), force = false) {
    this.dbg('Model createSchema')
    if (await Knex.schema.hasTable(this.name)) {
      if (!force) {
        this.dbg('not re-creating table.')
        return
      } else {
        this.dbg('re-creating table.')
        await this.dropSchema()
      }
    }
    // Create database schema. You should use knex migration files
    // to do this. We create it here for simplicity.
    return Knex.schema.createTable(this.name, (table) => {
      return this.createSchemaOn(table)
    })
  }

  static async dropSchema (Knex = require('../knex')) {
    this.dbg('Model dropSchema')
    if (await Knex.schema.hasTable(this.name)) {
      this.dbg('dropping..')
      return Knex.schema.dropTable(this.name)
    } else {
      this.dbg('table exists...')
      return
    }

  }
}

module.exports = Model
