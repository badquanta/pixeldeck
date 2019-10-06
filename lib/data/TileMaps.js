'use strict'

/** @ignore */
const base = require('./base')
/** @ignore */
const _Model = require('./_Model')

/** @ignore */
const dbg = require('../dbg').extend('data:TileMaps')
/**
 * Object Relational Model Root for `TileMaps` loki collection.
 *
 * @class TileMaps
 * @extends {_Model}
 */
class TileMaps extends _Model {
  /** @type {number}  */
  get height () { return this.record.height }
  /** @type {boolean} */
  get infinite () { return this.record.infinite }
  /** @type {Array} */
  get layers () { return this.record.layers }
  /** @type {number}  */
  get nextlayerid () { return this.record.nextlayerid }
  /** @type {number}  */
  get nextobjectid () { return this.record.nextobjectid }
  /** @type {string}  */
  get orientation () { return this.record.orientation }
  /** @type {string} */
  get renderorder () { return this.record.renderorder }
  /** @type {number} */
  get tiledversion () { return this.record.tiledversion }
  /** @type {number} */
  get tileheight () { return this.record.tileheight }
  /** @type {Array<TileSet>} */
  get tilesets () { return this.record.tilesets }
  /** @type {number} */
  get tilewidth () { return this.record.tilewidth }
  /** @type {string} */
  get type () { return this.record.type }
  /** @type {string} */
  get version () { return this.record.version }
  /** @type {number} */
  get width () { return this.record.width }
  /** @type {string} */
  get path () { return this.record.path }
  /** @type {Object}
   *  @todo document better
   **/
  get meta () { return this.record.meta }
}
TileMaps.collection = base.addCollection('TileMaps', {})
module.exports = TileMaps
dbg('loaded')
