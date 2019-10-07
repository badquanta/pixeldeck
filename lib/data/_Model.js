
/** @ignore */
const dbg = require('../dbg').extend('data')
/** @ignore */
const arch = require('../arch')
/**
 * Root Object-relation-model
 * @todo Maybe extend proxies?
 * @memberof pixeldeck.data
 * @abstract
 */
class _Model {
  /**
   * Retrieves/Updates & Persists @param json
   * @param {object} json to be used in query or

   */
  constructor (json = {}) {
    let record
    if (!json.$loki) {
      const query = arch.cleanQuery(json)
      this.constructor.dbg('finding or creating by: %o', json)
      record = this.collection.findOne(query) || this.collection.insert(json)
    } else {
      this.constructor.dbg('initializing new reference to: %o', json)
      record = json
    }
    Object.defineProperties(this, {
      record: { writable: true, enumerable: false, configurable: false, value: record },
      dbg: { writable: false, enumerable: false, configurable: false, value: this.constructor.dbg.extend(`[${record.id}]`) }
    })
    this.dbg('loaded')
  }

  /**
   * `json` will be passed to `cleanQuery` before being used to query.
   *
   * @param {object|string} json
   * @return {_Model}
   */
  static find (json) {
    const query = arch.cleanQuery(json)
    this.dbg('find where: %o', json)
    const record = this.collection.findOne(query)
    if (record) {
      this.dbg('found')
      return new this(record)
    } else {
      this.dbg('not-found')
      return false
    }
  }

  /**
   * Read a JSON resource file from a path, return the parsed JSON
   * @param {*} path
   * @return {Object} parsed JSON from file at path into object
   * @throws {Error} if file doesn't exist
   */
  static readFromSync (path) {
    const hostPath = arch.getResPathFor(path, '.json')
    dbg('loadFromJsonFile', hostPath)
    if (arch.Fs.existsSync(hostPath)) {
      const json = arch.Fs.readFileSync(hostPath)

      const data = JSON.parse(json)
      return new this(Object.assign(data, { path }))
    } else {
      throw new Error(`No such json file: ${hostPath}`)
    }
  }

  /**
   * Either find an existing record for this path;
   * Or load and create a record from data at this path
   * @param {*} path
   * @return {_Model}
   */
  static findOrLoad (path) {
    this.dbg('findOrLoad', path)
    let rec = this.find(path)
    if (!rec) rec = this.readFromSync(path)
    return rec
  }

  /**
   * get a the classes output handle.
   */
  static get dbg () {
    return dbg.extend(this.name)
  }

  /**
   * Defaults to the collection defined on the constructor
   * @returns {Loki} collection
   */
  get collection () {
    return this.constructor.collection
  }

  /**
   *
   */
  // --- INSTANCE METHODS:
  /**
   * persist this record to the loki database.
   */
  save () {
    /**
     * @property {object} record
     */
    this.record = this.collection.update(this.record)
  }
}

module.exports = _Model
