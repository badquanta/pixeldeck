const { Model: Objection } = require('objection')
//Objection.knex(require('../data'))
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



  static async ensureAllSchemas (Knex = require('../data'), ...allModels) {
    global.totalSteps = (global.totalSteps || 0) + allModels.length
    global.finishedSteps = global.finishedSteps || 0

    const dbg = this.dbg.extend('ensureAllSchemas')
    function stpReport () {
      dbg('Progress: %d of %d = %d%%',
        global.finishedSteps,
        global.totalSteps,
        ((global.finishedSteps / global.totalSteps) * 100)
      )
    }
    dbg(' %d schemas... ', allModels.length)
    return allModels.reduce(
      (promiseChain, currentModel, idx) => {
        const schemaId = idx
        const schemaDbg = this.dbg.extend(`ensureAllSchemas[${schemaId}:${currentModel.name}]`)
        schemaDbg('%d', schemaId)
        return promiseChain.then(
          chainResults => {
            schemaDbg('started', currentModel.name)
            return currentModel.ensureSchema(Knex).then(
              currentResult => {
                stpReport()
                global.finishedSteps++
                stpReport()
                return [...chainResults, currentResult]
              }
            )
          }
        )
      }, Promise.resolve([])
    ).then(arrayOfResults => {
      dbg('all finished')
      return arrayOfResults
    })
  }

  static async beforeEnsureSchema (Knex) {
    this.dbg('beforeEnsureSchema()')
  }

  static async ensureSchema (Knex = require('../data')) {
    this.dbg('Model ensureSchema')
    if (await Knex.schema.hasTable(this.name)) {
      // Don't do anything...
      return Promise.resolve()
    } else {
      this.dbg('Model table does not exist, creating...')
      await this.createSchema()
    }
    await this.afterEnsureSchema()
  }

  static async afterEnsureSchema () {
    this.dbg('After Ensure Schema')
  }

  static async createSchema (Knex = require('../data')) {
    await this.beforeEnsureSchema(Knex)
    if (await Knex.schema.hasTable(this.name)) {
      await this.dropSchema()
    }
    // Create database schema. You should use knex migration files
    // to do this. We create it here for simplicity.
    await Knex.schema.createTable(this.name, (table) => {
      return this.createSchemaOn(table)
    })
  }

  static async dropSchema (Knex = require('../data')) {
    this.dbg('Model dropSchema')
    if (await Knex.schema.hasTable(this.name)) {
      this.dbg('dropping..')
      return Knex.schema.dropTable(this.name)
    } else {
      this.dbg('table did not exist already...')
    }
  }
}

module.exports = Model
