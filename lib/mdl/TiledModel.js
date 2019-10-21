/**
 * Auto incremented integer for each table.
 * @typedef mdl.primaryKey
 */
/**
 * this module provides the basis of Tiled data representation
 * @external Objection
 * @see {@link https://vincit.github.io/objection.js/guide/}
 *
 */
const { Model: Objection } = require('objection')
/**
 * @memberof mdl
 * @class
 * @augments external:Objection
 * /property {primaryKey} uuid the database universally unique id.
 *
 */
class TiledModel extends Objection {
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
    return this.name
  }

  /**
   * define what this class requires; should be overridden if anything is required.
   * @abstract
   */
  static get jsonSchemaRequired () {
    return undefined
  }

  /**
   * define what properties this class defines; should be EXTENDED
   * @abstract
   */
  static get jsonSchemaProperties () {
    var newProps = {
      uuid: {
        type: 'integer'
      }
    }
    // this.dbg('get jsonSchemaProperties %o', newProps)
    return newProps
  }

  /**
   * @abstract
   */
  static get jsonSchema () {
    var newSchema = {
      type: 'object',
      properties: this.jsonSchemaProperties,
      required: this.jsonSchemaRequired
    }
    // this.dbg('get jsonSchema = %o', newSchema)
    return newSchema
  }

  /**
   * @abstract
   * @param {external:Knex.schema} table
   */
  static async createSchemaOn (table) {
    this.dbg('Model createSchemaOn')
    /**
     * @name uuid
     * @type {mdl.primaryKey}
     * @memberof mdl.TiledModel
     * @instance
     **/
    table.increments('uuid').primary()
    return table
  }

  /**
   * Ensure all these schemas exist.
   * @param {external:Knex} Knex
   * @param  {...any} allModels
   */
  static async ensureAllSchemas (Knex = require('../data'), ...allModels) {
    global.totalSteps = (global.totalSteps || 0) + allModels.length
    global.finishedSteps = global.finishedSteps || 0

    // const dbg = this.dbg.extend('ensureAllSchemas')
    // function stpReport () {
    // dbg('Progress: %d of %d = %d%%',
    // global.finishedSteps,
    // global.totalSteps,
    // ((global.finishedSteps / global.totalSteps) * 100)
    // )
    // }
    // dbg(' %d schemas... ', allModels.length)
    return allModels.reduce(
      (promiseChain, currentModel, idx) => {
        // const schemaId = idx
        // const schemaDbg = this.dbg.extend(`ensureAllSchemas[${schemaId}:${currentModel.name}]`)
        // schemaDbg('%d', schemaId)
        return promiseChain.then(
          chainResults => {
            // schemaDbg('started', currentModel.name)
            return currentModel.ensureSchema(Knex).then(
              currentResult => {
                // stpReport()
                global.finishedSteps++
                // stpReport()
                return [...chainResults, currentResult]
              }
            )
          }
        )
      }, Promise.resolve([])
    ).then(arrayOfResults => {
      // dbg('step complete')
      return arrayOfResults
    })
  }

  static async beforeEnsureSchema (Knex) {
    this.dbg('beforeEnsureSchema()')
  }

  /**
   * Ensures that the table for this model has been defined.
   * @param {Knex} Knex
   */
  static async ensureSchema (Knex = require('../data')) {
    return new Promise((resolve, reject) => {
      this.dbg('Model ensureSchema')
      return Knex.schema.hasTable(this.name).then(hasSchema => {
        if (hasSchema) {
          this.dbg('Schema already exists')
          return resolve()
        } else {
          this.dbg('Schema does not exist, creating...')
          return this.createSchema().then(this.afterEnsureSchema)
        }
      })
    })
  }

  /**
   *
   */
  static async afterEnsureSchema () {
    this.dbg('After Ensure Schema')
  }

  /**
   *  Create this model's schema
   */
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

  /**
   * Drop this schema
   * @param {*} Knex
   */
  static async dropSchema (Knex = require('../data')) {
    this.dbg('Model dropSchema')
    if (await Knex.schema.hasTable(this.name)) {
      this.dbg('dropping..')
      return Knex.schema.dropTable(this.name)
    } else {
      this.dbg('table did not exist already...')
    }
  }

  /**
   * try to render this
   * @requires pug
   * @requires path
   * @requires ../cfg
   */
  async render (options = {}) {
    const pug = require('pug')

    const opts = Object.assign({}, options, {
      typeName: this.constructor.name,
      format: '.html',
      basedir: require('../cfg').viewsDir
    })
    const typeName = opts.typeName
    opts[typeName] = this
    const format = options.format
    if (!format) {
      throw new Error('options missing format')
    }
    const viewPath = (opts.viewPath || (opts.viewPath = require('path').join(typeName, format)))
    const rendered = await pug.renderFile(viewPath, opts)
    return rendered
  }
}

module.exports = TiledModel
