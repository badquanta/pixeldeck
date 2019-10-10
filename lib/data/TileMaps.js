'use strict'

/** @ignore */
const base = require('./base')
/** @ignore */
const _Model = require('./_Model')

/** @ignore */
const dbg = require('../dbg').extend('data:TileMaps')
/**
 * Object Relational Model Root for `TileMaps` loki collection.
 * @memberof pixeldeck.data
 */
class TileMaps extends _Model {
  /** @type {number}  */
  get height () {
    return this.record.height
  }

  /** @type {boolean} */
  get infinite () {
    return this.record.infinite
  }

  /** @type {Array} */
  get layers () {
    return this.record.layers
  }

  /** @type {number}  */
  get nextlayerid () {
    return this.record.nextlayerid
  }

  /** @type {number}  */
  get nextobjectid () {
    return this.record.nextobjectid
  }

  /** @type {string}  */
  get orientation () {
    return this.record.orientation
  }

  /** @type {string} */
  get renderorder () {
    return this.record.renderorder
  }

  /** @type {number} */
  get tiledversion () {
    return this.record.tiledversion
  }

  /** @type {number} */
  get tileheight () {
    return this.record.tileheight
  }

  /** @type {Array<TileSet>} */
  get tilesets () {
    return this.record.tilesets
  }

  /** @type {Array<TileSets>} */
  get TileSets () {
    const TileSets = require('./TileSets')
    return this.record.tilesets.map((tme)=> {
      if (tme.source) {
        return TileSets.findOrLoad({
          path: this.record.path
        })
      } else {
        return new TileSets(tme)
      }
    })
  }

  /** @type {number} */
  get tilewidth () {
    return this.record.tilewidth
  }

  /** @type {string} */
  get type () {
    return this.record.type
  }

  /** @type {string} */
  get version () {
    return this.record.version
  }

  /** @type {number} */
  get width () {
    return this.record.width
  }

  /** @type {string} */
  get path () {
    return this.record.path
  }

  /** @type {Object}
   *  @todo document better
   **/
  get meta () {
    return this.record.meta
  }

  /**
   * translate an index to an X,Y coordinate in pixels
   * @return {[number, number]}
   */
  idx2xy (idx, w = this.width, th = this.tileheight) {
    return [(idx % w) * tileMap.tilewidth, Math.floor(idx / w) * th]
  }
}
TileMaps.collection = base.addCollection('TileMaps', {
  autoupdate: true
})
module.exports = TileMaps
dbg('loaded')
