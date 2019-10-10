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
      this.constructor.dbg('finding or creating by: %o', Object.keys(json))
      record = this.collection.findOne(query) || this.collection.insert(json)
    } else {
      this.constructor.dbg('initializing new reference to:', json)
      record = json
    }
    Object.defineProperties(this, {
      record: {
        writable: true,
        enumerable: false,
        configurable: false,
        value: record
      },
      dbg: {
        writable: false,
        enumerable: false,
        configurable: false,
        value: this.constructor.dbg.extend(`[${record.$loki}]`)
      }
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
    this.dbg('find where: %o', Object.keys(json))
    const record = this.collection.findOne(query)
    if (record) {
      this.dbg('existing record found')
      return new this(record)
    } else {
      this.dbg('no existing record found')
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
   * call the collection's count function
   */
  static get count () {
    return this.collection.count()
  }

  /**
   * This uses collection.find and doesn't clean any args.
   * @param args will be passed to the collections methodd.
   * @return {Array<_Model>} what is returned will be mapped to _Model (child) instances.
   **/
  static findAll (...args) {
    const Self = this;
    return this.collection.find(...args).map((value) => {
      return (new Self(value))
    })
  }

  /**
   * @param ...args will be
   * @return {_Model} what is returned will be mapped to _Model (child) instances; or null if nothing found.
   */
  static findOne (...args) {
    const found = this.collection.findOne(...args)
    return found ? new this(found) : null
  }

  static by$loki (id) {
    const found = this.collection.get(id)
    return found ? new this(found) : null
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
