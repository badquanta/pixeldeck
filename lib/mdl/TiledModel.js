/**
 * Auto incremented integer for each table.
 * @typedef mdl.primaryKey
 */
/**
 * Roughly corresponds to the EcmaScript Date class
 * @see {@link https://www.w3schools.com/jsref/jsref_obj_date.asp Date @ W3Schools.com}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date Date @ MDN}
 * @typedef mdl.timestamp
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
 *
 */
class TiledModel extends Objection {
  /**
   * return the class debugger
   * @private
   */
  static get dbg () { return super.dbg ? super.dbg.extend(this.name, '>') : require('../dbg').extend(this.name) }
  /**
   * return the instance debugger
   * @private
   */
  get dbg () { return this.constructor.dbg.extend('instance') }
  /**
   * get the class's id column; Model defines this as uuid globally.
   * @private
   */
  static get idColumn () {
    return 'uuid'
  }

  /**
   * get the class's table name; which should be the class name.
   * @private
   */
  static get tableName () {
    return this.name
  }

  /**
   * define what this class requires; should be overridden if anything is required.
   * @abstract
   * @protected
   */
  static get jsonSchemaRequired () {
    return undefined
  }

  /**
   * define what properties this class defines; should be EXTENDED
   * @abstract
   * @protected
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
   * @protected
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
   * @protected
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
   * Ensure all these schemas exist. Helper function, does not relate to any specific model.
   * @param {external:Knex} Knex
   * @param  {...mdl.TiledModel} anyInheritingModels
   * @public
   * @todo maybe move to the mdl namespace?
   */
  static async ensureAllSchemas (Knex = require('../data'), ...allModels) {
    return allModels.reduce(
      (promiseChain, currentModel, idx) => {
        return promiseChain.then(
          chainResults => {
            return currentModel.ensureSchema(Knex).then(
              currentResult => {
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

  /**
   * A hook for inheriting models to attach pre-ensureSchema logic
   * @todo may rename to preCreate and drop the pre/post ensure.
   * @protected
   * @abstract
   */
  static async beforeEnsureSchema (Knex) {
    this.dbg('beforeEnsureSchema()')
  }

  /**
   * Ensures that the table for this model has been defined.
   * @param {Knex} Knex the knex instance we'll be operating with
   * @public
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
   * A simple hook for inheriting models classes to attach logic post-ensure-schema events.
   * @abstract
   * @protected
   */
  static async afterEnsureSchema () {
    this.dbg('After Ensure Schema')
  }

  /**
   *  Create this model's schema. This will call the protected `createSchemaOn` method that is intended to be overridden by inheriting models.
   * @public
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
   * @public
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
   * The idea is that this is where relationships are refreshed before
   * a render, so each type of model should ensure it's immediate relations
   * are updated.
   * @abstract
   * @protected
   */
  async preRender () {
    this.dbg('preRender')
  }

  /**
   * this does some magic following conventions within the view directory:
   *   * the view directory has folders, the folders are named after the model's class (a.k.a. database table name.)
   *
   * @requires pug
   * @requires path
   * @requires ../cfg
   * @private
   */
  async render (options = {}) {
    await this.preRender()
    const pug = require('pug')

    const opts = Object.assign({}, options, {
      typeName: this.constructor.name,
      format: '.html',
      basedir: require('../cfg').viewsDir
    })
    const typeName = opts.typeName
    opts[typeName] = this.$toJson()
    const format = options.format
    if (!format) {
      throw new Error('options missing format')
    }
    const viewPath = (opts.viewPath || (require('path').join(opts.basedir, typeName, format + '.pug')))
    this.dbg('rendering %o with options %O', viewPath, opts)
    const rendered = await pug.renderFile(viewPath, opts)
    return rendered
  }
}

module.exports = TiledModel
