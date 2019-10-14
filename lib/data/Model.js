dbg = require('../dbg').extend('data:Model')
/**
 *
 */
class Model {
  /** @type {Array} */
  static get collectionIndices () {
    return new Array()
  }
  /** @type {Array} */
  static get collectionUniques () {
    return new Array()
  }
  /** @member {boolean} transactional */
  static get transactional () { return true }
  /** @member {boolean} asyncListeners */
  static get asyncListeners () { return true }
  /** @member {cloneObjects} cloneObjects*/
  static get cloneObjects () { return true }
  /** @member {boolean} {autoupdate} */
  static get autoupdate () { return true }

  /**
   * @type {object}
   * @member {Array<string>} indices
   * @member {Array<string>} unique
   * @member {boolean} transactional
   * @member {boolean} asyncListeners
   * @member {cloneObjects} cloneObjects
   * @member {boolean} {autoupdate}
   */
  static get collectionOptions () {
    return {
      indices: this.collectionIndices,
      unique: this.collectionUniques,
      transactional: this.transactional,
      asyncListeners: this.asyncListeners,
      cloneObjects: this.cloneObjects,
      autoupdate: this.autoupdate
    }
  }

  /**
   * @type {string}
   **/
  static get collectionName () {
    return this.name
  }

  /**
   * Get/Add the collection.
   * @type {Loki.collection}
   */
  static get collection () {
    return require('./base').addCollection(this.collectionName, this.collectionOptions)
  }
  /**
   * Convenience method for static version
   */
  get collection () { return this.constructor.collection }


  /**
   * Get any defaults that should be set on new TileSets
   */
  static get defaults () {
    return {

    }
  }
  get defaults () { return this.constructor.defaults }

  /**
   *
   * @param {*} data
   */
  static find (...args) {
    return this.collection.find(...args).map((a) => {
      return new this(a)
    })
  }

  static import (source) {
    return new this(require(source))
  }

  tryJSON (data) {
    let cleaned
    try {
      cleaned = JSON.parse(data)
    } catch (e) {
      dbg('TryJSON Failed:', e)
      return false;
    }
  }

  /**
   * @param {object} data
   * @param {number} data.height
   * @param {number} data.width
   * @param {boolean} data.infinite
   * @param {LokiFsAdapter.TileMapLayer}
   * build a new record.
   */
  constructor (data) {

    if (data instanceof Model) { return Data }
    dbg('data instanceof Proxy?', data instanceof Proxy)
    dbg('typeof data', typeof data)
    return new Proxy(data, this)
  }

  get (data, name) {
    dbg('get({%o}', ...arguments)
  }

  set (data, propertyName, propertyValue) {
    dbg('Set({%o})', ...arguments)
  }

}