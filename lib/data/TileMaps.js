'use strict'


const base = require('./base')

const _Model = require('./_Model')
const arch = require('../arch')
const dbg = require('../dbg').extend('data:TileMaps')
/**
 * Object Relational Model Root for `TileMaps` loki collection.
 *
 * @class TileMaps
 * @extends _Model
 */
class TileMaps extends _Model {
  constructor (json) {
    super(json)
    const defineReaders = (...fields) => {
      Object.defineProperties(this, fields.reduce((obj, field) => {
        obj[field] = { get: function () { return this.record[field] }, enumerable: true }
        return obj
      }, {}))
    }

  }
  /** @type {number}  */
  get height () { return this.record['height'] }
  /** @type {boolean} */
  get infinite () { return this.record['infinite'] }
  /** @type {Array} */
  get layers () { return this.record['layers'] }
  /** @type {number}  */
  get nextlayerid () { return this.record['nextlayerid'] }
  /** @type {number}  */
  get nextobjectid () { return this.record['nextobjectid'] }
  /** @type {string}  */
  get orientation () { return this.record['orientation'] }
  /** */
  get renderorder () { return this.record['renderorder'] }
  /** @type {number} */
  get tiledversion () { return this.record['tiledversion'] }
  /** @type {number} */
  get tileheight () { return this.record['tileheight'] }
  /** */
  get tilesets () { return this.record['tilesets'] }
  /** @type {number} */
  get tilewidth () { return this.record['tilewidth'] }
  /** */
  get type () { return this.record['type'] }
  /** */
  get version () { return this.record['version'] }
  /** @type {number} */
  get width () { return this.record['width'] }
  /** */
  get path () { return this.record['path'] }
  /** */
  get meta () { return this.record['meta'] }


  /** @member {TileMaps} */
  /** @member {TileMaps} */
  /** @member {TileMaps} */
}
TileMaps.collection = base.addCollection('TileMaps', {})
module.exports = TileMaps
